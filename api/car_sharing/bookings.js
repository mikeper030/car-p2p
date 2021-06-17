var mailer = require('../../util/mailer')
var express = require('express');
var router = express.Router();
const consts = require('../../constants')
const db = require('../../models');
var bcrypt = require('bcryptjs');
var multer  = require('multer');
var auth = require('../auth/AuthMiddleware');
const fetch = require('node-fetch')

router.post(consts.BOOKINGS_CREATE_BOOKING,auth.authenticate_request,function (req,res,next) {
    const data = req.body.data;
    if (!data.from||!data.to||!data.listing_id){
        return res.status(200).send({code:403,status: 'must provide listing id!'});
    }
    try {
        db.sequelize.query(
            "SELECT daily_price_low FROM listings WHERE listings.id = "+data.listing_id+""
            , {
                type: db.sequelize.QueryTypes.SELECT
            }).then(rowDataPrice=>{
                if (rowDataPrice) {
                    //calculate the price
                    const price = rowDataPrice[0].daily_price_low
                    var date1 = new Date(data.from);
                    var date2 = new Date(data.to);
                    var time_diff = date2.getTime() - date1.getTime();
                    var hour_diff = time_diff / (1000 * 3600)
                    var days_diff = time_diff / (1000 * 3600 * 24);
                    let pricePerHour = Number(price/24)
                    let totalPrice = (pricePerHour * hour_diff).toFixed(2)

                    db.Booking.sync().then(() => {
                        db.sequelize.query(
                            "SELECT* FROM Bookings WHERE listing_id = " + data.listing_id + "" +
                            " AND ( CAST( '" + data.from + "' AS DATETIME) <= Bookings.to AND CAST( '" + data.to + "' AS DATETIME) >= Bookings.from) ", {
                                type: db.sequelize.QueryTypes.SELECT
                            }).then(bookings => {
                            if (bookings.length > 0) {
                                return res.status(200).send({code: 403, status: 'The date range is not available!'});
                            } else {
                                db.Booking.create({
                                    price: String(totalPrice),
                                    from: data.from,
                                    to: data.to,
                                    listing_id: data.listing_id,
                                    uid: req.uid
                                }).then(r => {
                                    //run data query
                                    db.sequelize.query(
                                        "SELECT email, first_name, last_name, models.title as model, makes.title as make FROM Users" +
                                        " INNER JOIN listings ON listings.user_uid = Users.uid " +
                                        "INNER JOIN models ON models.id = listings.model_id" +
                                        " INNER JOIN makes ON models.make_id = makes.id WHERE listings.id = " + data.listing_id + ""
                                        , {
                                            type: db.sequelize.QueryTypes.SELECT
                                        }).then(rowData => {
                                        mailer.sendNewBookingEmail(rowData[0].email, `${data.from}  until: ${data.to}`, rowData[0].model + "," + rowData[0].make, `${rowData[0].first_name} ${rowData[0].last_name}`).then(r => {
                                            return res.status(200).send({
                                                code: 200,
                                                status: 'Thank you! your order has been received'
                                            });
                                        })
                                    })

                                })
                            }
                        })
                    });
                }else {
                    return res.status(200).send({code: 403, status: 'The listings may not be available!'});
                }
        })

    }catch (e) {
        console.log(e)
    }


});
router.get(consts.BOOKINGS_GET_BOOKINGS,auth.authenticate_request,function (req,res,next) {

    try {
        db.Booking.sync().then(() => {
            db.sequelize.query(
                "SELECT Bookings.price, listings.images_json, Bookings.from, Bookings.to FROM Bookings" +
                " INNER JOIN listings ON listings.id = Bookings.listing_id" +
                " INNER JOIN models ON listings.model_id = models.id " +
                " INNER JOIN makes ON models.make_id = makes.id Where uid = '"+req.uid+"'"
                , {
                    type: db.sequelize.QueryTypes.SELECT
                }).then(bookings=>{
                if (bookings){
                    return res.status(200).send({code:200,data: bookings});
                }else {
                    return res.status(200).send({code:404,data: bookings,status:"User has no bookings!"});
                }
            })
        });
    }catch (e) {
        console.log(e)
    }


});
module.exports=router
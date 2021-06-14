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
        db.Booking.sync().then(() => {
            db.sequelize.query(
                "SELECT* FROM Bookings WHERE listing_id = "+data.listing_id+"" +
                " AND ( CAST( '"+data.from+"' AS DATETIME) <= Bookings.to AND CAST( '"+data.to+"' AS DATETIME) >= Bookings.from) " , {
                    type: db.sequelize.QueryTypes.SELECT
                }).then(bookings=>{
                    if (bookings.length>0){
                        return res.status(200).send({code:403,status: 'The date range is not available!'});
                    }else {
                        db.Booking.create({
                            from:data.from,
                            to:data.to,
                            listing_id:data.listing_id,
                            uid:req.uid
                        }).then(r=>{
                            return res.status(200).send({code:200,status: 'Thank you! your order has been received'});
                        })
                    }
                })
        });
    }catch (e) {
        console.log(e)
    }


});
router.get(consts.BOOKINGS_GET_BOOKINGS,auth.authenticate_request,function (req,res,next) {
    const data = req.body.data;
    if (!data.uid){
        return res.status(200).send({code:403,status: 'must provide user id!'});
    }
    try {
        db.Booking.sync().then(() => {
            db.sequelize.query(
                "SELECT* FROM Bookings Where uid = "+data.uid+""
                , {
                    type: db.sequelize.QueryTypes.SELECT
                }).then(bookings=>{
                if (bookings){
                    return res.status(200).send({code:403,data: bookings});
                }else {
                    db.Booking().create({
                        data
                    }).then(r=>{
                        return res.status(200).send({code:200,status: 'Booking created successfully!'});
                    })
                }
            })
        });
    }catch (e) {
        console.log(e)
    }


});
module.exports=router
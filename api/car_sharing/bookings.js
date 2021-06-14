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
    if (!data.uid||!data.from||!data.to||!data.listing_id){
        return res.status(200).send({code:403,status: 'must provide listing id!'});
    }
    try {
        db.Booking.sync().then(() => {
            db.sequelize.query(
                "SELECT* FROM Bookings Where listing_id = "+data.listing_id+"" +
                " AND ("+data.from+" >= Bookings.from AND "+ data.from +" <= Bookings.to" , {
                    type: db.sequelize.QueryTypes.SELECT
                }).then(bookings=>{

                })
        });
    }catch (e) {
        console.log(e)
    }


});
module.exports=router
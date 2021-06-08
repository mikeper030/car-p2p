var express = require('express');
var router = express.Router();
const consts = require('../../constants')
const db = require('../../models');
var bcrypt = require('bcryptjs');
var multer  = require('multer');
var auth = require('../auth/AuthMiddleware');
const fetch = require('node-fetch')
/* GET users listing. */
var storage = multer.diskStorage(
    {
        destination: 'uploads/images/cars',
        filename: function ( req, file, cb ) {

            cb( null, file.originalname );
        }
    }
);
var carsPath = multer({storage:storage})

//get a specific listing by id
router.get(consts.LISTING_GET, function(req, res, next) {
    //todo pass the desired date ranges and search logic
    if (!req.query.id) {
        res.status(304).send({code: 304, status: "missing request params"})
    } else {
        const id = req.query.id
        let data = {}
        db.sequelize.query(
            "SELECT " +

            "CASE WHEN" +
            " listings.images_json != '' AND listings.images_json != '{}' THEN listings.images_json" +
            " ELSE models.images_json END as images_json, " +
            "listings.id as listing_id, " +
            "model_id, user_uid, lat, lng ," +
            // " (" +
            // "        6371 " +
            // "        * acos(" +
            // "            cos( radians("+lat+") ) " +
            // "            * cos( radians( listings.lat ) ) " +
            // "            * cos( radians( listings.lng ) - radians("+lng+") )" +
            // "            + sin( radians("+lat+") ) " +
            // "            * sin( radians( listings.lat ) ) " +
            // "        ) " +
            // "   ) AS distance,  " +
            "models.title as model_name, makes.title as maker_name, features_json," +
            "mobile_phone, 2 as feedback_score, description,notification_advance,min_trip_days, max_trip_days, daily_price_low as price, listings.updatedAt " +
            " FROM" +
            " listings INNER JOIN models ON listings.model_id = models.id INNER JOIN makes ON models.make_id = makes.id AND models.id = listings.model_id " +
            "  WHERE listings.id="+id+""

             , {
                type: db.sequelize.QueryTypes.SELECT
            }).then(listings=>{
            console.log(listings)
            if(listings[0]) {
                data.count = listings[0].count;
            }else
                data.count = 0;
            for(let a=0;a<listings.length;a++){
                delete listings[a]['count'];
                // listings[a]["distance"]+=" Km"
            }
            data.items = listings;
            res.status(200).send({status: 200, data: data});
        }).catch(function (err) {
            console.log(err)
        });
    }


});
router.get(consts.LISTINGS_GET, function(req, res, next) {
    //todo pass the desired date ranges and search logic
    const where = req.query.where
    const page = Number(req.query.page);
    const size = Number(req.query.size);
    if ( !req.query.size || !where || !req.query.page) {
      return   res.status(200).send({code: 403, status: "missing request params"})
    } else {
        //get the lat lng of user's specified location
        const offset =page*size;
        const data = {};

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+where+'&key=AIzaSyDDqsqjB6WrkHlUZgXBPCsHXXpZrBWfL1E')
            .then(res => res.json())
            .then(json => {
                const geometry = json.results[0].geometry
                const lat = geometry.location.lat
                const lng = geometry.location.lng
                db.sequelize.query(
                    "SELECT " +
                    " (SELECT COUNT(*) FROM listings WHERE  (" +
                    "        6371 " +
                    "        * acos(" +
                    "            cos( radians("+lat+") ) " +
                    "            * cos( radians( listings.lat ) ) " +
                    "            * cos( radians( listings.lng ) - radians("+lng+") )" +
                    "            + sin( radians("+lat+") ) " +
                    "            * sin( radians( listings.lat ) ) " +
                    "        ) " +
                    "   ) <25  ) as count, " +
                      "CASE WHEN" +
                    " listings.images_json != '' AND listings.images_json != '{}' THEN listings.images_json" +
                    " ELSE models.images_json END as images_json, " +
                    "listings.id as listing_id, " +
                    "model_id, user_uid, lat, lng , (" +
                    "        6371 " +
                    "        * acos(" +
                    "            cos( radians("+lat+") ) " +
                    "            * cos( radians( listings.lat ) ) " +
                    "            * cos( radians( listings.lng ) - radians("+lng+") )" +
                    "            + sin( radians("+lat+") ) " +
                    "            * sin( radians( listings.lat ) ) " +
                    "        ) " +
                    "   ) AS distance,  models.title as model_name, makes.title as maker_name, features_json," +
                    "mobile_phone, 2 as feedback_score, description,notification_advance,min_trip_days, max_trip_days, daily_price_low as price, listings.updatedAt " +
                    " FROM" +
                    " listings INNER JOIN models ON listings.model_id = models.id INNER JOIN makes ON models.make_id = makes.id AND models.id = listings.model_id " +
                    " HAVING distance < 25  " +
                    "ORDER BY distance "+
                    " LIMIT "+offset+","+size, {
                        type: db.sequelize.QueryTypes.SELECT
                    }).then(listings=>{
                    console.log(listings)
                    if(listings[0]) {
                        data.count = listings[0].count;
                    }else
                        data.count = 0;
                    for(let a=0;a<listings.length;a++){
                        delete listings[a]['count'];
                        listings[a]["distance"]+=" Km"
                    }
                    data.items = listings;
                    res.status(200).send({status: 200, data: data});
                }).catch(function (err) {
                    console.log(err)
                });
            });


    }


});

router.post(consts.LISTINGS_CREATE_LIST,auth.authenticate_request, function(req, res, next) {

    let data = req.body.data
    const uid = req.uid
    if (!data.model_id.id || !uid ||!data.car_location  || !data.price_form) {
        res.status(200).send({code: 403, status: "missing request params"})
    }else {
        const location = data.car_location.label
        //get the geocoding data from google maps api
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyDDqsqjB6WrkHlUZgXBPCsHXXpZrBWfL1E')
            .then(res => res.json())
            .then(json => {
                const geometry = json.results[0].geometry
                const lat = String(geometry.location.lat)
                const lng = String(geometry.location.lng)
                db.listing.create({
                    model_id: data.model_id.id,
                    user_uid: uid,
                    lat:lat,
                    lng:lng,
                    mobile_phone:data.mobile_number,
                    features_json:JSON.stringify(data.car_description.car_features),
                    description:data.car_description.car_desc,
                    max_trip_days:data.car_availability.max_trip_days,
                    min_trip_days:data.car_availability.min_trip_days,
                    advance_notice:data.car_availability.advance_notice,
                    daily_price_low: data.price_form.lowest_price,
                    daily_price_high: data.price_form.highest_price,
                }).then(r=>{
                    res.status(200).send({code: 200,id:r.id ,status: "Your listing was created successfully!"})
                })
            });

    }

});
router.post(consts.LISTINGS_IMAGE_UPLOAD_SINGLE,[auth.authenticate_request,carsPath.single('file')],function (req,res,next) {
    const image = req.body;
    const id = image.id;
    if (!id){
        return res.status(200).send({code:403,status: 'must provide listing id!'});
    }
    try {
            db.listing.sync().then(() => {
                db.listing.findOne({where: {id: image.id}}).then(querypart => {
                    if(querypart) {
                        let json = {"img1":req.file.originalname}
                        querypart.update({images_json: JSON.stringify(json)}).then(r => {
                            res.status(200).send({code:200,status: 'listing updated successfully!'});
                        });
                    }
                });
            });
    }catch (e) {
        console.log(e)
    }


});

router.post(consts.LISTINGS_IMAGE_UPLOAD_MULTIPLE,[auth.authenticate_request,carsPath.array('files',6)],function (req,res,next) {
    const image = req.body;
    const id = image.id;
    if (!id){
        return res.status(200).send({code:403,status: 'must provide listing id!'});
    }
    try {
        db.listing.sync().then(() => {
            db.listing.findOne({where: {id: image.id}}).then(querypart => {
                if(querypart) {
                    let json = {};
                    for (let i=0;i<req.files.length;i++){
                        json["img"+(i+1)]=req.files[i].originalname
                    }

                    querypart.update({images_json: JSON.stringify(json)}).then(r => {
                        res.status(200).send({code:200,status: 'listing updated successfully!'});
                    });
                }
            });
        });
    }catch (e) {
        console.log(e)
    }


});
module.exports = router;
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
    const from = req.query.from
    const to = req.query.to
    if (!req.query.id||!from||!to) {
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
            "mobile_phone, 2 as feedback_score, profile_img_url,year, description,first_name, last_name, notification_advance,min_trip_days, max_trip_days, daily_price_low as price, listings.updatedAt " +
            " FROM" +
            " listings INNER JOIN models ON listings.model_id = models.id " +
            "          INNER JOIN makes ON models.make_id = makes.id AND models.id = listings.model_id " +
            "          INNER JOIN Users ON Users.uid = listings.user_uid " +
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
                listings[a]["user"]=""
                if(listings[a]["first_name"]){
                    listings[a]["user"]+=listings[a]["first_name"]+=" "
                }
                if(listings[a]["last_name"]){
                    listings[a]["user"]+=listings[a]["last_name"]
                }
                if (listings[a]["profile_img_url"]){
                    listings[a]["profile_img_url"]="http://185.241.5.135:3000/uploads/images/profile/"+listings[a]["profile_img_url"]
                }
                var date1 = new Date(from);
                var date2 = new Date(to);
                var time_diff = date2.getTime() - date1.getTime();
                var hour_diff = time_diff / (1000 * 3600)
                var days_diff = time_diff / (1000 * 3600 * 24);
                listings[a]["trip_days"]=days_diff.toFixed(0)
                let pricePerHour = Number(listings[a].price/24)
                let totalPrice = pricePerHour * hour_diff
                listings[a]["total_price"]=totalPrice.toFixed(2)
            }
            data.items = listings;
            res.status(200).send({status: 200, data: data});
        }).catch(function (err) {
            console.log(err)
        });
    }


});

function applyAlgorithm(listings,maxPrice) {
    //get the max value of the prices
    for (let i=0;i<listings.length;i++){
         const feedbackGrade = (Number(listings[i].feedback_score)/5)*10
         const price = Number(listings[i]["daily_price_low"])
         const priceGrade = (((maxPrice-price)/maxPrice)*30)
         const distance = Number(listings[i].distance.split(" ")[0])
         const distanceGrade = (((25-distance)/25)*30)
         const yearGrade = ((12 - ((2021-listings[i].year)) /12)*20)
         const imageGrade = listings[i].images_json !=="{}"?10:0
         const total = feedbackGrade +distanceGrade+yearGrade+imageGrade+priceGrade
         listings[i]["overall_grade"] = total
     }
    listings.sort(function(a, b) {
        return parseFloat(a["overall_grade"]) - parseFloat(b["overall_grade"]);
    });

}

router.get(consts.LISTINGS_GET, function(req, res, next) {
    const order = req.query.order
    const where = req.query.where
    const from = req.query.from
    const to = req.query.to
    const page = Number(req.query.page);
    const size = Number(req.query.size);
    if ( !req.query.size || !where || !req.query.page || !from || !to) {
      return   res.status(200).send({code: 403, status: "missing request params"})
    } else {
        //get the lat lng of user's specified location
        const offset =page*size;
        const data = {};
        let orderByQ = ""
        if(order && order !=="best match"){
            orderByQ=" ORDER BY "
            orderByQ+=order
            orderByQ+= " ASC"
        }
        console.log(order!=="")
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
                    "   ) < 25  AND listings.id NOT IN " +
                    "   (SELECT listing_id FROM Bookings WHERE " +
                    "( CAST( '"+from+"' AS DATETIME) <= Bookings.to AND CAST( '"+to+"' AS DATETIME) >= Bookings.from)) ) as count, " +
                      "CASE WHEN" +
                    " listings.images_json != '' AND listings.images_json != '{}' THEN listings.images_json" +
                    " ELSE models.images_json END as images_json, " +
                    "listings.id as listing_id, " +
                    "model_id, user_uid, lat, lng , " +
                    "(" +
                    "        6371 " + //radius of the earth in km
                    "        * acos(" +
                    "            cos( radians("+lat+") ) " +
                    "            * cos( radians( listings.lat ) ) " +
                    "            * cos( radians( listings.lng ) - radians("+lng+") )" +
                    "            + sin( radians("+lat+") ) " +
                    "            * sin( radians( listings.lat ) ) " +
                    "        ) " +
                    "   ) AS distance" +
                    ",  " +
                    "models.title as model_name, year, makes.title as maker_name, features_json," +
                    "mobile_phone, 2 as feedback_score, description,notification_advance,min_trip_days, " +
                    "max_trip_days, daily_price_low as price, listings.updatedAt " +
                    " FROM" +
                    " listings " +

                    "INNER JOIN models ON listings.model_id = models.id " +
                    "INNER JOIN makes ON models.make_id = makes.id AND models.id = listings.model_id " +
                    "" +
                     " WHERE listings.id NOT IN (SELECT listing_id FROM Bookings " +
                    "  WHERE ( CAST( '"+from+"' AS DATETIME) <= Bookings.to AND CAST( '"+to+"' AS DATETIME) >= Bookings.from))" +
                    " HAVING distance < 25  "+ orderByQ+

                    " LIMIT "+offset+","+size, {
                        type: db.sequelize.QueryTypes.SELECT
                    }).then(listings=>{
                    console.log(listings)
                    if(listings[0]) {
                        data.count = listings[0].count;
                    }else
                        data.count = 0;
                    const priceArr = []
                    for(let a=0;a<listings.length;a++){
                        delete listings[a]['count'];
                        priceArr.push(listings[a].daily_price_low)
                        if (listings[a]["images_json"]&&listings[a]["images_json"]!==""){
                            console.log(listings[a]["images_json"])
                            listings[a]["thumbnail"]="http://185.241.5.135:3000/uploads/images/cars/"+JSON.parse(listings[a]["images_json"]).img1
                        }
                        if (listings[a]["distance"]!==0){
                            listings[a]["distance"]=listings[a].distance.toFixed(1)
                            listings[a]["distance"]+=" Km"
                        }else {
                            listings[a]["distance"]="0 Km"
                        }
                        var date1 = new Date(from);
                        var date2 = new Date(to);
                        var time_diff = date2.getTime() - date1.getTime();
                        var hour_diff = time_diff / (1000 * 3600)
                        var days_diff = time_diff / (1000 * 3600 * 24);
                        listings[a]["trip_days"]=days_diff.toFixed(0)
                        let pricePerHour = Number(listings[a].price/24)
                        let totalPrice = pricePerHour * hour_diff
                        listings[a]["total_price"]=totalPrice.toFixed(2)

                    }
                    if (order ==='best match'){
                        //apply the algorithm
                       applyAlgorithm(listings,Math.max(...priceArr))
                    }
                    data.items = listings;
                    res.status(200).send({status: 200, data: data});
                }).catch(function (err) {
                    console.log(err)
                });
            });


    }


});
router.get(consts.LISTINGS_GET_FOR_USER,auth.authenticate_request, function(req, res, next) {

    db.sequelize.query(
        "SELECT listings.daily_price_low AS price, models.title as model, makes.title as make, listings.createdAt, listings.images_json FROM listings " +
        "INNER JOIN models ON listings.model_id = models.id " +
        "INNER JOIN makes ON models.make_id = makes.id WHERE listings.user_uid = '"+req.uid+"'" , {
            type: db.sequelize.QueryTypes.SELECT
        }).then(listings=>{

           return  res.status(200).send({code: 200, data: listings});

        }).catch(function (err) {
            console.log(err)
        });

});
router.post(consts.LISTINGS_CREATE_LIST,auth.authenticate_request, function(req, res, next) {

    let data = req.body.data
    const uid = req.uid
    if(!data.price_form.lowest_price){
        return res.status(200).send({code: 403, status: "missing price field!"})
    }
    if(!data.year){
        return res.status(200).send({code: 403, status: "missing model year!"})
    }
    if(!data.mobile_number){
        return res.status(200).send({code: 403, status: "missing mobile phone!"})
    }
    if (!data.model_id.id || !uid ||!data.car_location  ) {
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
                    year:data.year,
                    mobile_phone:data.mobile_number,
                    features_json:JSON.stringify(data.car_description.car_features),
                    description:data.car_description.car_desc,
                    max_trip_days:data.car_availability.max_trip_days,
                    min_trip_days:data.car_availability.min_trip_days,
                    advance_notice:data.car_availability.advance_notice,
                    daily_price_low: data.price_form.lowest_price,
                    daily_price_high: 0,
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
                            res.status(200).send({code:200,status: 'Image uploaded successfully!'});
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
                    console.log(req.files)
                    for (let i=0;i<req.files.length;i++){
                        json["img"+(i+1)]=req.files[i].originalname
                    }

                    querypart.update({images_json: JSON.stringify(json)}).then(r => {
                        res.status(200).send({code:200,status: 'Images uploaded successfully!'});
                    });
                }
            });
        });
    }catch (e) {
        console.log(e)
    }


});

module.exports = router;
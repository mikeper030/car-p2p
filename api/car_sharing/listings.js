var express = require('express');
var router = express.Router();
const consts = require('../../constants')
const db = require('../../models');
var bcrypt = require('bcryptjs');
var multer  = require('multer');
var auth = require('../auth/auth');
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

router.post(consts.LISTINGS_CREATE_LIST,auth.authenticate_request, function(req, res, next) {
    let data =JSON.parse(req.body.data)
    if (!data.model_id || !data.user_uid ||!data.car_coordinates  || !data.daily_price_low) {
        res.status(200).send({code: 304, status: "missing request params"})
    }else {
        db.listing.create({
            model_id: data.model_id,
            user_uid: data.user_uid,
            feedback_score: "5",
            feedback_json: "",
            car_coordinates: JSON.stringify(data.car_coordinates),
            description:data.description||"",
            daily_price_low: data.daily_price_low,
            daily_price_high: data.daily_price_low||0,
        }).then(r=>{
            res.status(200).send({code: 200,id:r.id, status: "Your listing was created successfully!"})
        })
    }

});

router.get(consts.LISTINGS_GET,auth.authenticate_request, function(req, res, next) {
    //todo pass the desired date ranges and search logic
    if (!req.query.page || !req.query.size) {
        res.status(304).send({code: 304, status: "missing request params"})
    } else {
        const page = Number(req.query.page);
        const size = Number(req.query.size);
        const title = String(req.query.title);
        const offset =page*size;
        const data = {};
        db.sequelize.query(
            "SELECT " +
            " (SELECT COUNT(*) FROM listings INNER JOIN models ON listings.model_id = models.id) as count, " +
            "CASE WHEN" +
            " listings.images_json != '' AND listings.images_json != '{}' THEN listings.images_json ELSE models.images_json END as images_json, " +
            "model_id, user_uid, feedback_score, feedback_json, car_coordinates, daily_price_low as price, listings.updatedAt " +
            " FROM" +
            " listings INNER JOIN models ON listings.model_id = models.id " +
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
            }
            data.items = listings;
            res.status(200).send({status: 200, data: data});
        }).catch(function (err) {
            console.log(err)
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
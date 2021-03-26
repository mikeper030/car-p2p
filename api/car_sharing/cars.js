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
var profilePath = multer({storage:storage})

router.get(consts.CARS_GET_MAKERS,auth.authenticate_request, function(req, res, next) {
    db.make.findAndCountAll({
         raw: true//, order:[sortKey]
    }).then(function (cars) {
        var data = {}
        data.count = cars.count;
        data.items = cars.rows;
        res.status(200).send({status: "success", data: data});
    })

});

router.get(consts.CARS_GET_MODELS_BY_MAKE,auth.authenticate_request, function(req, res, next) {

    const make_id = req.query.make_id
    db.model.findAndCountAll({
        raw: true, where: {make_id:make_id}
    }).then(function (cars) {
        var data = {}
        data.count = cars.count;
        data.items = cars.rows;
        res.status(200).send({status: "success", data: data});
    })

});

module.exports = router;

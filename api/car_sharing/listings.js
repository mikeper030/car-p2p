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
     const list = req.body.details
     
});



module.exports = router;

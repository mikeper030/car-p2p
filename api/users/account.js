var express = require('express');
var router = express.Router();
const consts = require('../../constants')
const db = require('../../models');
var bcrypt = require('bcryptjs');
var multer  = require('multer');
var auth = require('../auth/auth');
router.post(consts.ACCOUNT_RESET_PASS,function (req,res,next) {
    let userRequest = req.body;
    if(!userRequest.email){
        res.status(200).send({status: 'Missing request params!'});
        return;
    }
    try {
        db.User.sync().then(r=>{
            db.User.findOne({where: {email: userRequest.email}}).then(user => {
                if (user) {
                    bcrypt.genSalt(10).then(salt=>{
                        bcrypt.hash(util.makeToken(8), salt).then(hash=>{
                            db.Password_reset.sync().then(r=>{
                                db.Password_reset.create({
                                    email:userRequest.email,
                                    hash:hash,
                                    timestamp: new Date().getTime()
                                })
                                    .then((user) => {
                                        //send the reset email
                                        mailer.sendPasswordResetEmail(user.email,hash)
                                    })

                            });
                        });
                    });
                }
                res.status(200).send({redirect_url:"/"+user.priviledge+"/login",status: "נשלח מייל לאיפוס!"});

            });
        });

    }catch (e) {
        res.status(500).send({status:'internal error'});
        console.log(e);
    }


});
module.exports = router;

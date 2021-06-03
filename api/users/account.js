var express = require('express');
var router = express.Router();
const consts = require('../../constants')
const db = require('../../models');
var bcrypt = require('bcryptjs');
var multer  = require('multer');
var auth = require('../auth/AuthMiddleware');
const mailer = require('../../util/mailer')
const util = require('../../util/util')


router.get(consts.ACCOUNT_RESET_PASS,function (req,res,next) {
    let email = req.query.email;
    if(!email){
        res.status(200).send({code:404,status: 'Missing request params!'});
        return;
    }
    try {
        db.User.sync().then(r=>{
            db.User.findOne({where: {email: email}}).then(user => {
                if (user) {
                    bcrypt.genSalt(10).then(salt=>{
                        bcrypt.hash(util.makeToken(8), salt).then(hash=>{
                            db.Password_reset.sync().then(r=>{
                                db.Password_reset.create({
                                    email:email,
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
                res.status(200).send({code:200,status: "ok"});

            });
        });

    }catch (e) {
        res.status(500).send({status:'internal error'});
        console.log(e);
    }


});

//activate email endpoint
router.get(consts.ACCOUNT_SEND_EMAIL_ACTIVATE,function (req,res,next) {
    let email = req.query.email;
    if(!email){
        res.status(403).send({status:"missing request params!"});
        return;
    }else {
        db.User.sync().then(r=>{
            db.User.findOne({
                where:{email:email}
            }).then(row=>{
                if(row){
                   const token = util.makeToken(30)
                   row.update({activation_token: token}).then(()=>{
                       mailer.sendAccountActivationEmail(email,`${row.first_name} ${row.last_name}`,`${consts.WEBSITE_URL}/account?action=verify-email&token=`+token).then(
                           ()=>{
                               res.status(200).send({
                                   code:200,response:"Email sent successfully!"
                               })
                           }
                       )
                   })

                }else {
                    res.status(200).send({
                        code:404,status:"User not found!"
                    })
                }
            })
        })

    }
});

//activate email endpoint
router.get(consts.ACCOUNT_EMAIL_ACTIVATE,function (req,res,next) {
    let token = req.query.token;
    if(!token){
        res.status(403).send({status:"missing request params!"});
        return;
    }else {
        db.User.sync().then(r=>{
            db.User.findOne({
                where:{activation_token:token}
            }).then(row=>{
                if(row){
                    row.update({
                        emailVerified:1
                    }).then(r=>{
                        res.status(200).send({
                            code:200,status:"Your account was activated successfully!"
                        })
                    })
                }else {
                    res.status(200).send({
                        code:404,status:"invalid token!"
                    })
                }
            })
        })

    }
});

router.post(consts.ACCOUNT_SUBMIT_NEW_PASS,function (req,res,next) {
    let userRequest = req.body;
    if(!userRequest.hash){
        res.status(200).send({status: 'Missing request params!'});
        return;
    }
    try {
        db.Password_reset.sync().then(r=>{
            db.Password_reset.findOne({where: {hash: userRequest.hash}}).then(temp => {
                if (temp) {
                    let timestamp = temp.timestamp;
                    let now = new Date().getTime();
                    //check if the url is not expired within 1 hour
                    if (now - timestamp<=3600000){
                        db.User.findOne({where: {email: temp.email}}).then(user => {
                            console.log("hrll "+userRequest.password);
                            bcrypt.genSalt(10).then(salt=>{
                                bcrypt.hash(userRequest.password,salt, function(err, hash) {
                                    if (err) {
                                        throw err;
                                    }else {
                                        user.update({
                                            password: hash
                                        }).then(result => {

                                            mailer.sendPasswordReplacedEmail(user.email);
                                            res.status(200).send({code:200,response:"ok"});
                                        });
                                    }
                                    // Do whatever you like with the hash
                                });

                            }); //whatever number you want

                        });
                    }else {
                        res.status(403).send({status: "Not allowed!"});
                    }
                }else {
                    res.status(403).send({status: "Not allowed"});
                }


            });
        });

    }catch (e) {
        res.status(500).send({status:'internal error'});
        console.log(e);
    }
});
module.exports = router;

var express = require('express');
var router = express.Router();
const consts = require('../../constants')
const db = require('../../models');
var bcrypt = require('bcryptjs');
const util = require('../../util/util')
var multer = require('multer');
var auth = require('../auth/AuthMiddleware');
const uuidAPIKey = require('uuid-apikey');
const mailer = require('../../util/mailer')
/* GET users listing. */
var storage = multer.diskStorage(
    {
        destination: 'uploads/images/profile',
        filename: function (req, file, cb) {

            cb(null, file.originalname);
        }
    }
);
var profilePath = multer({storage: storage})

//list all users
router.get(consts.USERS_GET_ENDPOINT, function (req, res, next) {
    if (!req.query.page || !req.query.size) {
        res.status(400).send({status: "missing request params"})
    } else {
        const page = Number(req.query.page);
        const size = Number(req.query.size);
        const offset = page * size;

        db.User.findAndCountAll({
            limit: size, offset: offset, raw: true//, order:[sortKey]
        }).then(function (users) {
            var data = {}
            data.count = users.count;
            data.items = users.rows;
            res.status(200).send({status: "success", data: data});
        })
    }
});
//create a user
router.post(consts.USER_POST_BY_DETAILS_ENDPOINT, profilePath.single("file"), function (req, res, next) {
    const user_data = JSON.parse(req.body.user)
    const token =util.makeToken(30);
    if (!user_data || !user_data.first_name || !user_data.last_name || !user_data.email || !user_data.password || !user_data.phone) {
        res.status(400).send({response: "Missing user details"})
    } else {
        db.User.sync().then(() => {
            db.User.findOne({where: {email: user_data.email}}).then((user) => {
                if (user) {
                    res.status(400).send({response: "Email already in use by another account!"})
                } else {
                    if (req.file && req.file.originalname && req.file.originalname !== '') {
                        user_data.profile_img_url = req.file.originalname
                    }
                    user_data.activation_token = token
                    db.User.create(user_data).then((user) => {
                        res.status(200).send({code:200,status: "User created successfully!"})
                        mailer.sendAccountActivationEmail(user.email,user.username,`${consts.WEBSITE_URL}/account?action=verify-email&token=`+token)
                    })
                }
            })

        })
    }
})
//update existing user
router.put(consts.USER_PUT_BY_UID, profilePath.single("file"), auth.authenticate_request, function (req, res, next) {
    const user_data = JSON.parse(req.body.user)
    const uid = req.uid

        db.User.findOne({where: {uid: uid}}).then(
            (user) => {
                if (user) {
                    if (req.file && req.file.originalname && req.file.originalname !== '') {
                        user_data.profile_img_url = req.file.originalname
                    }
                    user.update(user_data).then(re => {
                        res.status(200).send({code:200,status: "User updated successfully"})
                    })
                } else {
                    res.status(200).send({code:403,status: "User not found!"})
                }
            })
})

//Used for login
router.get(consts.USER_GET_BY_EMAILPASS_ENDPOINT, async function (req, res, next) {
    const email = req.header('email');
    const pass = req.header('password')
    if (!pass || !email) {
        res.status(403).send({response: "Missing email or password"})
    } else {
        const row = await db.sequelize.query(
            "SELECT " +
            "Users.uid, Users.password,AccessTokens.token, Users.emailVerified" +
            " FROM Users LEFT JOIN AccessTokens ON Users.uid = AccessTokens.uid WHERE email = ?"
            , {
                replacements: [email],
                type: db.sequelize.QueryTypes.SELECT
            });
        const user = row[0]
        if (user) {
            bcrypt.compare(pass, user.password, function (err, c) {
                if (c === true) {
                    let cred = uuidAPIKey.create()
                    let exp = new Date()
                    //in one hour to the token will exp
                    exp.setTime(exp.getTime() + 60 * 60 * 1000)
                    if (!user.token) {
                        db.AccessToken.sync().then(() => {
                            db.AccessToken.create({
                                uid: user.uid,
                                expires: exp,
                                token: cred.apiKey
                            })
                        })
                    } else {
                        db.AccessToken.sync().then(() => {
                            db.AccessToken.update({
                                expires: exp,
                                token: cred.apiKey
                            }, {
                                where: {uid: user.uid}
                            })
                        })
                    }
                    if (user.emailVerified===1){
                        res.status(200).send({code: 200, response: "User found!", token: cred.apiKey, expires: exp})
                    }else {
                        res.status(200).send({code: 403, response: "Email not confirmed!"})
                    }

                } else {
                    res.status(200).send({code: 403, response: "Email or password is incorrect!"})
                }
            });

        } else {
            res.status(200).send({code: 404, response: "User does not exist!"})
        }
    }
})

//Used for retrieving specific user details
router.get(consts.USER_GET_BY_UID ,auth.authenticate_request, async function (req, res, next) {
    const token = req.query.token
    if (!token) {
        return res.status(403).send({code: 404, response: "Security token is missing!"})
    }
    const row = await db.sequelize.query(
        "SELECT* FROM Users INNER JOIN AccessTokens ON Users.uid = AccessTokens.uid WHERE AccessTokens.token = ?"
        , {
            replacements: [token],
            type: db.sequelize.QueryTypes.SELECT
        });
    const user = row[0]
    if (user) {
    if (user.profile_img_url) {
        let img = "http://185.241.5.135:3000/uploads/images/profile/" + user.profile_img_url
        user.profile_img_url = img
    }


    delete user.password
    delete user.token
    delete user.uid

        return res.status(200).send({code: 200, data: user, response: "ok"})
    } else {
        return res.status(200).send({code: 404, response: "User not found!"})
    }

})
//Used for refreshing user token
router.get(consts.USER_REFRESH_TOKEN, async function (req, res, next) {
    const token = req.query.token
    if (!token) {
        return res.status(403).send({code: 404, response: "Security token is missing!"})
    }
    const row = await db.sequelize.query(
        "SELECT* FROM Users INNER JOIN AccessTokens ON Users.uid = AccessTokens.uid WHERE AccessTokens.token = ?"
        , {
            replacements: [token],
            type: db.sequelize.QueryTypes.SELECT
        });
    const user = row[0]
    if (user) {
        let cred = uuidAPIKey.create()
        let exp = new Date()
        //add one hour to the exp
        exp.setTime(exp.getTime() + 60 * 60 * 1000)
        db.AccessToken.sync().then(() => {
            db.AccessToken.update({
                expires: exp,
                token: cred.apiKey
            }, {
                where: {uid: user.uid}
            }).then(()=>{
                return res.status(200).send({code: 200, token: cred.apiKey,expires:exp.getTime(), response: "ok"})
            })
        })
    } else {
        return res.status(200).send({code: 403, response: "Token is invalid!"})
    }

})


module.exports = router;

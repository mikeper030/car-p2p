const db = require('../../models');
module.exports={

    authenticate_request:function(req,res,next){



            const auth_token = req.header('token');
            const uid = req.header('uid');

            if (!auth_token || auth_token.trim() === '')
                return res.status(403).send({authentication: "Security token is invalid!"})
            else {
                //todo check if token expired
                db.AccessToken.sync().then(p => {
                    db.AccessToken.findOne({
                        where: {
                            token: auth_token,uid:uid
                        }
                    }).then(row => {
                        if (row) {
                            next()
                        } else {
                            return res.status(403).send({authentication: "Security token is invalid!"})
                        }
                    })
                })
            }

    },


}
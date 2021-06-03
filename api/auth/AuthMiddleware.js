const db = require('../../models');
module.exports={

    authenticate_request:function(req,res,next){
            let auth_token = req.header('Authorization');
            if (!auth_token) auth_token = req.query.token


            if (!auth_token || auth_token.trim() === '')
                return res.status(403).send({authentication: "Security token is invalid!"})
            else {
                db.AccessToken.sync().then(p => {
                    db.AccessToken.findOne({
                        where: {
                            token: auth_token
                        }
                    }).then(row => {
                        if (row) {
                            let date = new Date()
                            let exp =  new Date(row.expires);
                            if(date > exp){
                                return res.status(403).send({authentication: "Security token expired!"})
                            }else {
                                next()
                            }

                        } else {
                            return res.status(403).send({authentication: "Security token is invalid!"})
                        }
                    })
                })
            }

    },



}
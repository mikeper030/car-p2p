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
        destination: 'uploads/images/profile',
        filename: function ( req, file, cb ) {

            cb( null, file.originalname );
        }
    }
);
var profilePath = multer({storage:storage})

//list all users
router.get(consts.USERS_GET_ENDPOINT, function(req, res, next) {
    if(!req.query.page||!req.query.size){
        res.status(400).send({status:"missing request params"})
    }else {
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
//create a new user
router.post(consts.USER_POST_BY_DETAILS_ENDPOINT,profilePath.single("myFile"),function (req,res,next) {
    const user_data = JSON.parse(req.body.user)
    if (!user_data.first_name||!user_data.last_name||!user_data.email||!user_data.password||!user_data.phone){
       res.status(400).send({response:"Missing user details"})
   }else {
     db.User.sync().then(()=>{
         db.User.findOne({where:{email:user_data.email}}).then((user)=>{
               if (user){
                   res.status(200).send({code:400,response:"Email already in use by another account!"})
               }else {
                   if(req.file&&req.file.originalname&&req.file.originalname!==''){
                       user_data.profile_img_url = req.file.originalname
                   }
                   db.User.create(user_data).then((user)=>{
                       res.status(200).send({code:200,response:"User created successfully!"})
                   })
               }
         })

     })
   }
})
//update a user
router.put(consts.USER_PUT_BY_UID,profilePath.single("myFile"),function (req,res,next) {
    const user_data = JSON.parse(req.body.user)
    const uid = req.body.uid
    if(!uid){
        res.status(403).send({response:"Missing uid"})
    }else {
       db.User.findOne({where:{uid:uid}}).then(
           (user)=>{
           if(user){
               if(req.file&&req.file.originalname&&req.file.originalname!==''){
                   user_data.profile_img_url = req.file.originalname
               }
               user.update(user_data).then(re=>{
                   res.status(200).send({response:"User updated successfully"})
               })
           }else {
               res.status(403).send({response:"User not found!"})
           }
       })
    }
})

//Used for login
router.get(consts.USER_GET_BY_EMAILPASS_ENDPOINT,async function (req,res,next) {
  const email = req.header('email');
  const pass = req.header('password')
  if (!pass||!email){
      res.status(403).send({response:"Missing email or password"})
  }else {
      const row = await db.sequelize.query(
          "SELECT* FROM Users INNER JOIN AccessTokens ON Users.uid = AccessTokens.uid WHERE email = ?"
          , {
              replacements: [email],
              type: db.sequelize.QueryTypes.SELECT
          });
       const user = row[0]
      if (user) {
          bcrypt.compare(pass, user.password, (err, data) => {
              //if error than throw error
              if (err) throw err

              //if both match than you can do anything
              if (data) {
                  res.status(200).send({code:200,response: "User found!",username:user.first_name, apiKey: user.token,uid:user.uid})
              } else {
                  res.status(200).send({response: "Email or password mismatch!",code:403})
              }

          })

      } else {
          res.status(404).send({response: "User does not exist!"})
      }
  }
})

module.exports = router;

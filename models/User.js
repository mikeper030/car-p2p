'use strict';
var bcrypt = require('bcryptjs');
const uuidAPIKey = require('uuid-apikey');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_img_url: DataTypes.STRING,
    phone: DataTypes.STRING,
    uid: DataTypes.STRING,
    coordinates_json: DataTypes.TEXT
  }, {
    sequelize,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        modelName: 'User',
        hooks: {
      beforeCreate: async (user, options) => {
        const db = require('../models');
        const salt = await bcrypt.genSalt(4); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
        let cred = uuidAPIKey.create()
        user.uid = cred.uuid
        db.AccessToken.sync().then(()=>{
          db.AccessToken.create({
            uid: cred.uuid,
            expires:24,
            token:cred.apiKey
          })
        })
      },

    }
  }
  );

  User.prototype.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };


  return User;
};
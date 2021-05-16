'use strict';

var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Passwords = sequelize.define('Password_reset', {
        email:DataTypes.STRING,
        hash:DataTypes.STRING,
        timestamp:DataTypes.STRING,
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },  {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    Passwords.associate = function(models) {
        // associations can be defined here
    };
    return Passwords;
};
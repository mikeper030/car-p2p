'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Booking.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uid: DataTypes.STRING,
        from: DataTypes.DATE,
        price: DataTypes.TEXT,
        to: DataTypes.DATE,
        listing_id:DataTypes.STRING,
        cancelled:DataTypes.INTEGER

    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};
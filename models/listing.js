'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class listing extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    listing.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        model_id: DataTypes.INTEGER,
        user_uid: DataTypes.TEXT,
        feedback_score: DataTypes.INTEGER,
        feedback_json: DataTypes.TEXT,
        car_coordinates: DataTypes.TEXT,
        daily_price_low: DataTypes.INTEGER,
        daily_price_high: DataTypes.INTEGER,
        availability_json: DataTypes.TEXT,

    }, {
        sequelize,
        modelName: 'listing',
    });
    return listing;
};
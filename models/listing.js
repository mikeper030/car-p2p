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
        year: DataTypes.INTEGER,
        user_uid: DataTypes.TEXT,
        lat: DataTypes.TEXT,
        lng: DataTypes.TEXT,
        features_json: DataTypes.TEXT,
        mobile_phone: DataTypes.TEXT,
        notification_advance: DataTypes.INTEGER,
        min_trip_days: DataTypes.INTEGER,
        max_trip_days: DataTypes.INTEGER,
        description:DataTypes.TEXT,
        images_json:{
            type:DataTypes.TEXT,
            defaultValue:"{}"
        },
        daily_price_low: DataTypes.INTEGER,
        daily_price_high: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'listing',
    });
    return listing;
};
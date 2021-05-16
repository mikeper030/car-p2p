'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class model extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    model.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        make_id: DataTypes.INTEGER,
        images_json: DataTypes.TEXT,
        code: DataTypes.STRING,
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'model',
    });
    return model;
};
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order);
        }
    }
    User.init(
        {
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            deliveryAddress: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "User",
            tableName: "User",
            timestamps: false,
        }
    );
    return User;
};

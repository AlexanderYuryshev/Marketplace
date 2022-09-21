"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User);
            Cart.hasMany(models.Purchase);
        }
    }
    Cart.init(
        {
            UserId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "User",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Cart",
            tableName: "Cart",
            timestamps: false,
        }
    );
    return Cart;
};

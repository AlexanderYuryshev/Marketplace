"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsToMany(models.Order, { through: "OrderTable" });
            // Product.belongsToMany(models.Cart, { through: models.CartTable });
            Product.belongsTo(models.Purchase);
        }
    }
    Product.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            cost: DataTypes.DOUBLE,
            vendorInfo: DataTypes.TEXT,
            image: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "Product",
            timestamps: false,
        }
    );
    return Product;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Purchase extends Model {
        static associate(models) {
            Purchase.belongsTo(models.Cart);
            Purchase.belongsToMany(models.Order, { through: "OrderTable" });
            Purchase.hasOne(models.Product);
        }
    }
    Purchase.init(
        {
            ProductId: {
                type: DataTypes.INTEGER,
                references: {
                    model: "Product",
                    key: "id",
                },
            },
            amount: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "Purchase",
            tableName: "Purchase",
            timestamps: false,
        }
    );
    return Purchase;
};

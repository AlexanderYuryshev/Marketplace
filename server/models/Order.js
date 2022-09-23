"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
          Order.belongsTo(models.User);
          Order.belongsToMany(models.Purchase, {through: "OrderTable"});
        }
    }
    Order.init(
        {
            orderDate: DataTypes.DATEONLY,
            status: DataTypes.STRING,
            cost: DataTypes.DOUBLE,
            deliveryDate: DataTypes.DATEONLY,
            deliveryAddress: DataTypes.TEXT,
            UserId: {
              type: DataTypes.INTEGER,
              references: {
                model: 'User',
                key: 'id',
              },
            }
        },
        {
            sequelize,
            modelName: "Order",
            tableName: "Order",
            timestamps: false,
        }
    );
    return Order;
};

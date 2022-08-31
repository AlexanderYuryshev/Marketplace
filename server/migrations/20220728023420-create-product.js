"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Product", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            cost: {
                type: Sequelize.DOUBLE,
            },
            vendorInfo: {
                type: Sequelize.TEXT,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
            },
            image: {
                type: Sequelize.TEXT,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Product");
    },
};

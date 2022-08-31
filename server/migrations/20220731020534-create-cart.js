"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cart", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "User",
                    key: "id",
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Cart");
    },
};

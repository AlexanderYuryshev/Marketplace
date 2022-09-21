"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("User", [
            {
                name: "Tisha",
                password: "123456",
                deliveryAddress: "Australia, Melbourn"
            },
            {
                name: "Uma",
                password: "123456",
                deliveryAddress: "Italia, Rome"
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("User", null, {});
    },
};

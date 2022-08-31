"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("User", [
            {
                name: "Tisha",
                password: "",
                deliveryAddress: "Australia, Melbourn"
            },
            {
                name: "Uma",
                password: "",
                deliveryAddress: "Italia, Rome"
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("User", null, {});
    },
};

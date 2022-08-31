"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Product", [
            {
                title: "Water",
                description: "Bla-bla-bla",
                cost: 1000,
                vendorInfo: "Good vendor",
                image: "https://www.istockphoto.com/ru/%D1%84%D0%BE%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%B8/bottled-water"
            },
            {
                title: "Bread",
                description: "Bla-bla-bla",
                cost: 2000,
                vendorInfo: "Bad vendor",
                image: ""
            },
            {
                title: "Fish",
                description: "Bla-bla-bla",
                cost: 50000,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Meat",
                description: "Bla-bla-bla",
                cost: 36213,
                vendorInfo: "Medium vendor",
                image: ""
            },
            {
                title: "Milk",
                description: "Bla-bla-bla",
                cost: 1235,
                vendorInfo: "Bad vendor",
                image: ""
            },
            {
                title: "Tea",
                description: "Bla-bla-bla",
                cost: 2003,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Coffee",
                description: "Bla-bla-bla",
                cost: 10,
                vendorInfo: "Bad vendor",
                image: ""
            },
            {
                title: "Eggs",
                description: "Bla-bla-bla",
                cost: 3000,
                vendorInfo: "Good vendor",
                image: ""
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Product", null, {});
    },
};

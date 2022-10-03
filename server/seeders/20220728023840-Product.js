"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Product", [
            {
                title: "Water",
                description: "Bla-bla-bla",
                cost: 1000,
                vendorInfo: "Good vendor",
                image: ""
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
            {
                title: "Icecream",
                description: "Bla-bla-bla",
                cost: 4000,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Cheese",
                description: "Bla-bla-bla",
                cost: 5000,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Potato",
                description: "Bla-bla-bla",
                cost: 6000,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Candies",
                description: "Bla-bla-bla",
                cost: 200,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Tractor",
                description: "Bla-bla-bla",
                cost: 300,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Chicken",
                description: "Bla-bla-bla",
                cost: 15000,
                vendorInfo: "Good vendor",
                image: ""
            },
            {
                title: "Chocolate",
                description: "Bla-bla-bla",
                cost: 1200,
                vendorInfo: "Good vendor",
                image: ""
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Product", null, {});
    },
};

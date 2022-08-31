'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      deliveryAddress: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
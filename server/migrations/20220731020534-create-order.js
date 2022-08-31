'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING
      },
      deliveryDate: {
        type: Sequelize.DATEONLY
      },
      deliveryAddress: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order');
  }
};
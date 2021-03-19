'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_number: {
        type: Sequelize.STRING
      },
      files_url: {
        type: Sequelize.STRING
      },
      shopId: {
        type: Sequelize.INTEGER
      },
      email_user: {
        type: Sequelize.STRING
      },
      buy_price: {
        type: Sequelize.INTEGER
      },
      payment_status: {
        type: Sequelize.INTEGER
      },
      prove_of_transaction: {
        type: Sequelize.STRING
      },
      order_content: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_content: {
        type: Sequelize.JSONB,
      },
      files_url: {
        type: Sequelize.STRING,
      },
      order_price: {
        type: Sequelize.INTEGER,
      },
      shop_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Shops",
          key: "id",
        },
      },
      email_user: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "email",
        },
      },
      payment_status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      proof_receipt_transaction: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders")
  },
}

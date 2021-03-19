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
        validate: {
          notEmpty: {
            args: true,
            msg: `Order number must not be empty`,
          },
          notNull: {
            args: true,
            msg: `Order number is required`,
          },
        },
      },
      order_content: {
        type: Sequelize.JSON,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Order content must not be empty`,
          },
          notNull: {
            args: true,
            msg: `Order content is required`,
          },
        },
      },
      files_url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `File URL must not be empty`,
          },
          notNull: {
            args: true,
            msg: `File URL is required`,
          },
        },
      },
      order_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Shop Id must not be empty`,
          },
          notNull: {
            args: true,
            msg: `File URL is required`,
          },
        },
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
        allowNull: false,
        default: 1,
        validate: {
          notEmpty: {
            args: true,
            msg: `Payment status must not be empty`,
          },
          notNull: {
            args: true,
            msg: `Payment status is required`,
          },
        },
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

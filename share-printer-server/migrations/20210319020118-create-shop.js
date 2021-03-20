"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Shop name must not be empty`,
          },
          notNull: {
            args: true,
            msg: `Shop name is required`,
          },
        },
      },
      products: {
        type: Sequelize.JSON,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Location must not be empty`,
          },
          notNull: {
            args: true,
            msg: `Location is required`,
          },
        },
      },
      status_open: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: `Email format is invalid`,
          },
          notEmpty: {
            args: true,
            msg: `Email must not be empty`,
          },
          notNull: {
            args: true,
            msg: `Email is required`,
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5],
            msg: `Password minimal length 5`,
          },
          notEmpty: {
            args: true,
            msg: `Password must not be empty`,
          },
          notNull: {
            args: true,
            msg: `Password is required`,
          },
        },
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
    await queryInterface.dropTable("Shops")
  },
}

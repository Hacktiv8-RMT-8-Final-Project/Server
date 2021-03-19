"use strict"
const { Model } = require("sequelize")
const { hashPass } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name can not be empty",
          },
        },
      },
      products: {
        type: DataTypes.JSON,
      },
      location: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Location can not be empty",
          },
        },
      },
      status_open: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: "Status open can not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email already taken",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email can not be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password can not be empty",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user, opt) {
          user.password = hashPass(user.password)
        },
      },
      sequelize,
      modelName: "Shop",
    }
  )
  return Shop
}

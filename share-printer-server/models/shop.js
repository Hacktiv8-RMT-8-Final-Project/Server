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
            msg: "Name Cannot be Empty",
          },
        },
      },
      products: DataTypes.JSON,
      location: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Location Cannot Be Empty",
          },
        },
      },
      status_open: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            args: true,
            msg: "Status Open Cannot Be Empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email Already Taken",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email Cannot Be Empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password Cannot Be Empty",
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

"use strict"
const { Model } = require("sequelize")

const { hashPass } = require("../helpers/bcrypt")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Order)
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Username can not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email has already been taken",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email can not be empty",
          },
          isEmail: {
            args: true,
            msg: "Email is invalid",
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
          len: {
            args: 6,
            msg: "Password must be at least 6 characters",
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
      modelName: "User",
    }
  )
  return User
}

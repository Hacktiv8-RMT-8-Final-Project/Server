"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "email_user",
      })
      Order.belongsTo(models.Shop, {
        foreignKey: "shop_Id",
      })
    }
  }
  Order.init(
    {
      order_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Order number can not be empty",
          },
        },
      },
      order_content: {
        type: DataTypes.JSONB,
        validate: {
          notEmpty: {
            args: true,
            msg: "Order content can not be empty",
          },
        },
      },
      files_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "File URL can not be empty",
          },
        },
      },
      order_price: {
        type: DataTypes.INTEGER,
      },
      shop_Id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Shops",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      email_user: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "email",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      payment_status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      proof_receipt_transaction: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  )
  return Order
}

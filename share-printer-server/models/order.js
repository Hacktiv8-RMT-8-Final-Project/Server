'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    order_number: DataTypes.STRING,
    files_url: DataTypes.STRING,
    shopId: DataTypes.INTEGER,
    email_user: DataTypes.STRING,
    buy_price: DataTypes.INTEGER,
    payment_status: DataTypes.INTEGER,
    prove_of_transaction: DataTypes.STRING,
    order_content: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
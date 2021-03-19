const { User, Shop, Order } = require("../models")
const { hashPass, comparePass } = require("../helpers/bcrypt.js")
const { generateToken, decoded } = require("../helpers/jwt.js")

class OrderShopController {
  static async read(req, res, next) {
    const { email } = req.decoded
  }
  static async read_by_id(req, res, next) {
    //
  }
  static async read_all_completed_shop_orders(req, res, next) {
    //
  }
}

module.exports = OrderShopController

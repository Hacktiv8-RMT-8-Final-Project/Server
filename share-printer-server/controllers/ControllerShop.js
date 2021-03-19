const { Shop } = require("../models")
const { hashPass, comparePass } = require("../helpers/bcrypt.js")
const { generateToken, decoded } = require("../helpers/jwt.js")

class ControllerShop {
  static async register(req, res, next) {
    try {
      const { name, location, email, password, products } = req.body
      const shop = await Shop.create({ name, location, email, password, products })
      res.status(201).json({
        msg: "Register success",
        id: shop.id,
        email: shop.email,
        name: shop.name,
      })
    } catch (err) {
      next(err)
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const shop = await Shop.findOne({ where: { email } })

      if (!shop) throw { status: 400, msg: `Invalid email or password` }
      const comparedPassword = comparePass(password, shop.password)

      if (!comparedPassword) throw { status: 400, msg: `Invalid email or password` }
      const access_token = generateToken({ id: shop.id, email: shop.email })

      res.status(200).json({
        msg: `Login success, access token granted`,
        email: shop.email,
        shop_name: shop.username,
        access_token: access_token,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerShop

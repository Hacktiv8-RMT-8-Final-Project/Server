const { Shop } = require("../models")
const { hashPass, comparePass } = require("../helpers/bcrypt.js")
const { generateToken, decoded } = require("../helpers/jwt.js")

class ShopController {
  static async register(req, res, next) {
    try {
      const { name, location, email, password } = req.body
      const shop = await Shop.create({ name, location, email, password })
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
  static async read_details(req, res, next) {
    try {
      const { email } = req.decoded
      const shop = await Shop.findOne({ where: { email } })
      res.status(200).json({
        msg: `Successfully read shop details`,
        data: shop,
      })
    } catch (err) {
      next(err)
    }
  }
  static async update_details(req, res, next) {
    try {
      const { id, email } = req.decoded
      const { name, location, products, status_open } = req.body
      // const converted_products = JSON.parse(products)
      const updateData = { name, products, location, status_open }
      const [count, data] = await Shop.update(updateData, {
        where: { email },
        returning: true,
      })
      if (count === 0) {
        throw { status: 404, msg: `Data not found` }
      } else {
        res.status(200).json({
          msg: "successfully updated data",
          data: data[0],
        })
      }
    } catch (err) {
      next(err)
    }
  }
  static async delete_products_details(req, res, next) {
    try {
      const { id, email } = req.decoded
      const { products_uuid } = req.body
      const shop = await Shop.findOne({ where: { email } })

      const product_finder = shop.products.map((e) => {
        if (e[products_uuid] === undefined) return e
      })
      const filtered_product_finder = product_finder.filter(function (el) {
        return el != null
      })
      const updated_data = { name: shop.name, products: filtered_product_finder, location: shop.location, status_open: shop.status_open }
      const [count, data] = await Shop.update(updated_data, {
        where: { email },
        returning: true,
      })
      if (count === 0) {
        throw { status: 404, msg: `Data not found` }
      } else {
        res.status(200).json({
          msg: "successfully updated data",
          data: data[0],
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ShopController

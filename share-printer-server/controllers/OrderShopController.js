const { Op } = require("sequelize")

const { User, Shop, Order } = require("../models")
const { hashPass, comparePass } = require("../helpers/bcrypt.js")
const { generateToken, decoded } = require("../helpers/jwt.js")

// ! 1 order requested 2 paid 3 confirm 4 on progress 5 completed 6 cancel
class OrderShopController {
  static async read(req, res, next) {
    try {
      const { id } = req.decoded
      const order = await Order.findAll({
        where: {
          shop_Id: id,
          payment_status: {
            [Op.ne]: 5,
          },
        },
      })
      res.status(200).json({
        msg: `Successfully read all orders that not completed`,
        data: order,
      })
    } catch (err) {
      next(err)
    }
  }
  static async update_by_id(req, res, next) {
    try {
      const { id } = req.decoded
      const order_id = req.params.id
      const { payment_status } = req.body
      const [count, data] = await Order.update(
        { payment_status: payment_status },
        {
          where: {
            shop_Id: id,
            id: order_id,
          },
          returning: true,
        }
      )
      if (count === 0) {
        throw { status: 404, msg: `Data not found` }
      } else {
        res.status(200).json({
          msg: "Successfully updated status order",
          data: data[0],
        })
      }
    } catch (err) {
      next(err)
    }
  }
  static async read_all_completed_shop_orders(req, res, next) {
    try {
      const { id } = req.decoded
      const order = await Order.findAll({
        where: {
          shop_Id: id,
          payment_status: 5,
        },
      })
      res.status(200).json({
        msg: `Successfully read all orders that not completed`,
        data: order,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = OrderShopController

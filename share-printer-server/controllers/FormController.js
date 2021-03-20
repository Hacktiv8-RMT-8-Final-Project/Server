const uuid = require("uuid")
const { Op } = require("sequelize")

const { User, Shop, Order } = require("../models")

class FormController {
  static async create_print_request(req, res, next) {
    try {
      const { files_url, order_content, shop_Id } = req.body
      // * Manual validation error
      let error_bucket = []
      if (!files_url) error_bucket.push("Please input your download file link")
      if (!order_content) error_bucket.push("Please input order requirement")
      if (!shop_Id) error_bucket.push("Please choose your printing shop")
      if (error_bucket.length > 0) throw { status: 404, msg: error_bucket }
      // * Validated continue
      const convert_order_content = JSON.parse(order_content)
      const order_number = uuid.v1().toString()
      const { email } = req.decoded
      // ! Need to add logic order_price / harga pembelian yang diambil dari order_content dan products ( pricing dari shop)
      const order_price = 10000 // ! still hardcode
      const order = await Order.create({
        order_number: order_number,
        order_content: convert_order_content,
        files_url: files_url,
        order_price: order_price,
        shop_Id: +shop_Id,
        email_user: email,
      })
      res.status(200).json({
        msg: "Your order has been successfully created",
        data: order,
      })
    } catch (err) {
      next(err)
    }
  }
  static async upload_receipt(req, res, next) {
    try {
      const { proof_receipt_transaction, order_Id } = req.body
      const [count, data] = await Order.update(
        {
          proof_receipt_transaction: proof_receipt_transaction,
          payment_status: 2,
        },
        { where: { id: order_Id }, returning: true }
      )
      if (count === 0) {
        throw { status: 404, msg: `Data not found` }
      } else {
        res.status(200).json({
          msg: "You have successfully updated your proof receipt transaction",
          data: data,
        })
      }
    } catch (err) {
      next(err)
    }
  }
  static async read_orders(req, res, next) {
    try {
      const { id, email } = req.decoded
      const order = await Order.findAll({
        where: {
          email_user: email,
          payment_status: {
            [Op.ne]: 5,
          },
        },
      })
      res.status(200).json({
        msg: `Successfully read your orders that are not completed`,
        data: order,
      })
    } catch (err) {
      next(err)
    }
  }
  // ! cancel order printing
  // ! 1 order requested 2 paid 3 confirm 4 on progress 5 completed 6 cancel
  static async cancel_order_status_payment(req, res, next) {
    try {
      const { email } = req.decoded
      const { order_number } = req.body
      const check_order = await Order.findOne({
        where: {
          order_number: order_number,
          email_user: email,
          payment_status: {
            [Op.ne]: 5,
          },
        },
      })
      if (check_order.payment_status === 6) throw { status: 400, msg: "You already cancel your order" }
      if (check_order.payment_status > 2 && check_order.payment_status < 6)
        throw { status: 400, msg: "You can not cancel your order, contact shop manually to cancel" }
      const data = await Order.update(
        { payment_status: 6 },
        {
          where: {
            order_number: order_number,
            email_user: email,
          },
        }
      )
      res.status(200).json({
        msg: `Successfully cancel your order print status ( number ${order_number} )`,
      })
    } catch (err) {
      next(err)
    }
  }
  static async read_history_orders(req, res, next) {
    try {
      const { email } = req.decoded
      const order = await Order.findAll({
        where: {
          email_user: email,
          payment_status: 5,
        },
      })
      res.status(200).json({
        msg: `Successfully read all your transaction history`,
        data: order,
      })
    } catch (err) {
      next(err)
    }
  }
  static async shop_list(req, res, next) {
    try {
      // ! logic finding 5km? via google map
      const shop = await Shop.findAll()
      res.status(200).json({
        msg: `Successfully read list of shop including the details near your area`,
        data: shop,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = FormController

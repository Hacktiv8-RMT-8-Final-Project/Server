const uuid = require("uuid")

class FormController {
  static async create_print_request(req, res, next) {
    try {
      const { files_url, order_content } = req.body
      const order_number = uuid.v1()
      console.log(req.decoded)
      // payments status = default 1 belum dibayar
      // ! email user < req.decoded.email
      // ! shop id ?
      // ! buy price ?
      // transaction_receipt
    } catch (err) {
      next(err)
    }
  }
}

module.exports = FormController

const uuid = require("uuid")

class FormController {
  static async create_print_request(req, res, next) {
    try {
      const { files_url, order_content } = req.body
      const order_number = uuid.v1()
      const { email } = req.decoded
      // ! shop id << buy price ? Explore Google Map
    } catch (err) {
      next(err)
    }
  }
}

module.exports = FormController

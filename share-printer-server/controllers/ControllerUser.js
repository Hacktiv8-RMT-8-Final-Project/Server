const { User } = require("../models")
const { hashPass, comparePass } = require("../helpers/bcrypt.js")
const { generateToken, decoded } = require("../helpers/jwt.js")

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body
      const user = await User.create({ username, email, password })
      res.status(201).json({
        msg: "Register success",
        id: user.id,
        email: user.email,
      })
    } catch (err) {
      next(err)
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })

      if (!user) throw { status: 400, msg: `Invalid email or password` }
      const comparedPassword = comparePass(password, user.password)

      if (!comparedPassword) throw { status: 400, msg: `Invalid email or password` }
      const access_token = generateToken({ id: user.id, email: user.email })

      res.status(200).json({
        msg: `Login success, access token granted`,
        email: user.email,
        username: user.username,
        access_token: access_token,
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerUser

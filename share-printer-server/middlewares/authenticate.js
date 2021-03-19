//@ts-check
const jwt = require("jsonwebtoken")
//@ts-ignore
const { User, Shop } = require("../models")

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function authenticateUser(req, res, next) {
  try {
    const access_token = req.headers.access_token
    //@ts-ignore
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET)
    //@ts-ignore
    const user = await User.findOne({ where: { email: decoded.email } })
    if (!user) throw { msg: `No user found with the token` }
    //@ts-ignore
    req.decoded = decoded
    next()
  } catch (err) {
    res.status(401).json({ msg: `Invalid token found` })
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function authenticateShop(req, res, next) {
  try {
    const access_token = req.headers.access_token
    //@ts-ignore
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET)
    //@ts-ignore
    const shop = await Shop.findOne({ where: { email: decoded.email } })
    if (!shop) throw { msg: `No shop found with the token` }
    //@ts-ignore
    req.decoded = decoded
    next()
  } catch (err) {
    res.status(401).json({ msg: `Invalid token found` })
  }
}

module.exports = { authenticateUser, authenticateShop }

//@ts-check
//@ts-ignore
const { User, Shop } = require("../models")

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function authorizeUser(req, res, next) {
  try {
    //@ts-ignore
    const user = await User.findOne({ where: { email: req.decoded.email } })
    if (!user) throw { msg: `No user found with the token` }
    next()
  } catch (err) {
    res.status(401).json({ msg: `Not Authorize` })
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function authorizeShop(req, res, next) {
  try {
    //@ts-ignore
    const shop = await Shop.findOne({ where: { email: req.decoded.email } })
    if (!shop) throw { msg: `No shop found with the token` }
    next()
  } catch (err) {
    res.status(401).json({ msg: `Not Authorize` })
  }
}

module.exports = { authorizeUser, authorizeShop }

const { Router } = require("express")
const router = Router()

const { authenticateUser, authenticateShop } = require("../middlewares/authenticate.js")
const { authorizeUser, authorizeShop } = require("../middlewares/authorize.js")

const UserRouter = require("./UserRouter.js")
const ShopRouter = require("./ShopRouter.js")

router.use("/user", UserRouter)
router.use("/shop", ShopRouter)

module.exports = router

const { Router } = require("express")
const router = Router()

const UserRouter = require("./UserRouter.js")
const ShopRouter = require("./ShopRouter.js")

router.use("/user", UserRouter)
router.use("/shop", ShopRouter)

module.exports = router

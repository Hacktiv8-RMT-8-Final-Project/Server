const { Router } = require("express")
const router = Router()

const routerUser = require("./users")
const routerShop = require("./shop")

router.use("/user", routerUser)
router.use("/shop", routerShop)

module.exports = router

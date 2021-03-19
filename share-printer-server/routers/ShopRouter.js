const { Router } = require("express")
const router = Router()

const ShopController = require("../controllers/ShopController.js")

const { authenticateShop } = require("../middlewares/authenticate.js")
const { authorizeShop } = require("../middlewares/authorize.js")

router.post("/register", ShopController.register)
router.post("/login", ShopController.login)

router.use(authenticateShop)

module.exports = router

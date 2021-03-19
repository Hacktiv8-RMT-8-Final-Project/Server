const { Router } = require("express")
const router = Router()

const ShopController = require("../controllers/ShopController.js")

const { authenticateUser, authenticateShop } = require("../middlewares/authenticate.js")
const { authorizeUser, authorizeShop } = require("../middlewares/authorize.js")

router.post("/register", ShopController.register)
router.post("/login", ShopController.login)

module.exports = router

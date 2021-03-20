const { Router } = require("express")
const router = Router()

const ShopController = require("../controllers/ShopController.js")
const OrderShopController = require("../controllers/OrderShopController.js")

const { authenticateShop } = require("../middlewares/authenticate.js")
const { authorizeShop } = require("../middlewares/authorize.js")

router.post("/register", ShopController.register)
router.post("/login", ShopController.login)

router.use(authenticateShop)
router.get("/detail", ShopController.read_details)
router.put("/detail/:id", authorizeShop, ShopController.update_details)

router.get("/order_lists", authorizeShop, OrderShopController.read)
router.patch("/order_lists/:id", authorizeShop, OrderShopController.update_by_id)
router.get("/transaction_history", authorizeShop, OrderShopController.read_all_completed_shop_orders)

module.exports = router

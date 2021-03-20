const { Router } = require("express")
const router = Router()

const UserController = require("../controllers/UserController.js")
const FormController = require("../controllers/FormController.js")

const { authenticateUser } = require("../middlewares/authenticate.js")
const { authorizeUser } = require("../middlewares/authorize.js")

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.use(authenticateUser)
router.post("/form", authorizeUser, FormController.create_print_request)
router.put("/upload_receipt", authorizeUser, FormController.upload_receipt)

router.get("/status_orders", authorizeUser, FormController.read_orders)
router.put("/status_orders/:id", authorizeUser, FormController.cancel_order_status_payment)

router.get("/transaction_history", authorizeUser, FormController.read_history_orders)
router.get("/shop_list", authorizeUser, FormController.shop_list)

module.exports = router

const { Router } = require("express")
const router = Router()

const UserController = require("../controllers/UserController.js")
const FormController = require("../controllers/FormController.js")

const { authenticateUser } = require("../middlewares/authenticate.js")
const { authorizeUser } = require("../middlewares/authorize.js")

router.post("/register", UserController.register)
router.post("/login", UserController.login)

router.get("/shop_list", FormController.shop_list)

router.use(authenticateUser)
router.post("/form", authorizeUser, FormController.create_print_request)
router.put("/upload_pdf", authorizeUser, FormController.upload_pdf)
router.put("/upload_receipt", authorizeUser, FormController.upload_receipt)

router.get("/status_orders", FormController.read_orders)
router.put("/status_orders/:id", FormController.cancel_order_status_payment)

router.get("/transaction_history", FormController.read_history_orders)

module.exports = router

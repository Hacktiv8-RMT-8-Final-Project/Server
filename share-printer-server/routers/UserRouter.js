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

module.exports = router

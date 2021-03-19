const {Router} = require('express')
const router = Router()
const ControllerShop = require('../controllers/ControllerShop')

router.post('/register', ControllerShop.register)
router.post('/login', ControllerShop.login)

module.exports = router

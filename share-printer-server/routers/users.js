const {Router} = require('express')
const router = Router()
const ControllerUser = require('../controllers/ControllerUser')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

module.exports = router

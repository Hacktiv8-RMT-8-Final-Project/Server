const {User} = require('../models')
const {generateToken} = require('../helpers/jwt')

class ControllerUser {
  static async register(req, res, next) {
    try {
      let username = req.body.username || ''
      let email = req.body.email || ''
      let password = req.body.password || ''
      let user = await User.create({username, email, password})
      res.status(201).json(user)
    }catch(err) {
      console.log(err)
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      let email = req.body.email || ''
      let password = req.body.password || ''
      let user = await User.findOne({where: {email}})
      if(user) {
        const comparePass = comparePass(passwo)
        if(comparePass){
          const access_token = generateToken({id: user.id, email})
          res.status(200).json(access_token)
        } else {
          throw {
            name: 'customError',
            status: 400,
            message: 'Email / Password Invalid'
          }
        }
      } else {
        throw {
          name: 'customError',
          status: 400,
          message: 'Email / Password Invalid'
        }
      }
    }
    catch(err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = ControllerUser
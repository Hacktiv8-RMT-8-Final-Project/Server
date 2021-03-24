const { Error, ValidationError } = require("sequelize")

/**
 * @param {*} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  // console.log(err, `<<< error from error handler`)
  // ! Error sequelize
  if (err instanceof Error) {
    switch (true) {
      case err instanceof ValidationError:
        // @ts-ignore
        let msg = err.errors.map((e) => e.message)
        res.status(400).json({
          msg: msg || err,
        })
        return
    }
    res.status(500).json({
      // @ts-ignore
      msg: `Sequelize internal server error`,
    })
    return
  }
  // ! Error custom
  switch (err.status) {
    case 400:
      res.status(400).json({
        msg: err.msg || `Bad request`,
      })
      return
    case 401:
      res.status(401).json({
        msg: err.msg || `Unauthorized`,
      })
      return
    case 403:
      res.status(403).json({
        msg: err.msg || `Forbidden`,
      })
      return
    case 404:
      res.status(404).json({
        msg: err.msg || `Error not found`,
      })
      return
  }
  // ! Catch all errors
  res.status(500).json({
    msg: err.msg || `Internal server error`,
  })
}

module.exports = errorHandler

const { validationResult } = require('express-validator')


const validationHandler = (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    const err = new Error('There is an invalid field')
    err.statusCode = 422
    err.data = errors.array()

    return next(err)
  }
  next()
}

module.exports = validationHandler


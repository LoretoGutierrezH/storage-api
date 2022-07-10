const jwt = require('jsonwebtoken')
const {utilErrorHandler} = require('./errorHandler')

const getCurrentUserId = (req, next) => {
  if (!req.headers.authorization) {
    const err = new Error('No authentication info was provided')
    return utilErrorHandler(null, next, err)
  }
  const filteredToken = req.headers.authorization.split(' ')[1]
    return jwt.verify(filteredToken, process.env.SESSION_TOKEN_KEY, (err, decoded) => {
      if (err) return next(err)
      req.authInfo = decoded
      return decoded.userId
    })
}

const isAuth = (req, res, next) => {
  const userId = getCurrentUserId(req, next)

  if (userId) return next()
  else return false
}

const renewToken = (req, res, next) => {
  const { iat, exp, ...payload } = req.authInfo
  const token = jwt.sign(payload, process.env.SESSION_TOKEN_KEY, { expiresIn: process.env.SESSION_TOKEN_EXPIRATION})

  return res.json({
    status: 'success',
    data: {
      token
    }
  })
}


module.exports = {getCurrentUserId, isAuth, renewToken}
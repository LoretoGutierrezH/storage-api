const {utilErrorHandler} = require('./errorHandler')
const jwt = require('jsonwebtoken')

const authorize = (req, roles, next) => {  //Refactor with auth from request object
  if (!req.headers.authorization) {
    const err = new Error('No authentication info was provided')
    return utilErrorHandler(null, next, err)
  }
  const filteredToken = req.headers.authorization.split(' ')[1]
  jwt.verify(filteredToken, process.env.SESSION_TOKEN_KEY, (err, decoded) => {
    if (err) return next(err)
    if (isRoleAuthorized(roles, decoded, next)) return next()
  })
}

const isRoleAuthorized = (roles, decoded, next) => {
  if (roles.includes(decoded.role)) return true
  const err = new Error('Role is not authorized to access this resource')
  return next(err)
}

module.exports = authorize
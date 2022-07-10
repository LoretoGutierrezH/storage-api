const utilErrorHandler = (doc = null, next, err = null) => { //improve arguments order
  //Error object from mongoose
  if (err) return next(err)
  
  //Custom error object when mongoose returns null
  if (!doc) {
    const err = new Error
    err.statusCode = 404
    err.message = 'Not found'
    return next(err)
  }

  
}

//This handler will take care of all errors, whether directly from mongoose or custom ones
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message
  const details = err.data

  return res.status(statusCode).json({
    status: 'fail',
    data: {
      message,
      details
    } 
  })
}

module.exports = {
  utilErrorHandler,
  errorHandler
}
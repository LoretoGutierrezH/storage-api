const userRouter = require('./userRouter')
const storageRouter = require('./storageRouter')
const orderRouter = require('./orderRouter')
const categoryRouter = require('./categoryRouter')


module.exports = (app) => {
  app.use('/api/v1', userRouter)
  app.use('/api/v1', storageRouter)
  app.use('/api/v1', orderRouter)
  app.use('/api/v1', categoryRouter)
}
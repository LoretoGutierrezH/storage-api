const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const v1Router = require('../routers/v1/index')
const {errorHandler} = require('../middlewares/errorHandler')
const swaggerUI = require('swagger-ui-express')
const swaggerConfig = require('./swagger.config.json')
const swaggerJsdoc = require('swagger-jsdoc')

//Creating app
const app = express()

//CORS
app.use(cors())

//Using body parser
app.use(express.json())

//Attaching morgan for debugging
app.use(morgan('dev'))

//Attaching File Upload
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))

//Swagger
const swaggerDocs = swaggerJsdoc(swaggerConfig)
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, {explorer: true}))

//Attaching app to correct router
v1Router(app)

//Error handler
app.use(errorHandler)


module.exports = app


const http = require('http')
const mongoose = require('mongoose')
const app = require('./config/app')
const dotenv = require('dotenv')

const server = http.createServer(app)
if (process.env.NODE_ENV === 'prod') {
  dotenv.config({path: `${__dirname}/prod.env`})
}

if (process.env.NODE_ENV === 'dev') {
  dotenv.config({path: `${__dirname}/dev.env`})
}
const mongoURL = process.env.MONGODB_URL.replace('<password>', process.env.MONGODB_PASSWORD)

mongoose.connect(mongoURL).then(() => {
  console.log('DB connection successful')
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
})

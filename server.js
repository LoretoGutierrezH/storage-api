const http = require('http')
const mongoose = require('mongoose')
const app = require('./config/app')
//const dotenv = require('dotenv').config()  .config() sets process.env to default .env file

const server = http.createServer(app)
if (process.env.NODE_ENV === 'prod') {
  require('dotenv').config({path: `${__dirname}/prod.env`})
}

if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config({path: `${__dirname}/dev.env`})
}
const mongoURL = process.env.MONGODB_URL.replace('<password>', process.env.MONGODB_PASSWORD)

mongoose.connect(mongoURL).then(() => {
  console.log('DB connection successful')
  server.listen('3000', () => {
    console.log('Server running on port 3000')
  })
})

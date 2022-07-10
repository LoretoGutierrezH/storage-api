const http = require('http')
const mongoose = require('mongoose')
const app = require('./config/app')
const dotenv = require('dotenv').config()

const server = http.createServer(app)

const mongoURL = process.env.MONGODB_URL.replace('<password>', process.env.MONGODB_PASSWORD)

mongoose.connect(mongoURL).then(() => {
  console.log('DB connection successful')
  server.listen('3000', () => {
    console.log('Server running on port 3000')
  })
})

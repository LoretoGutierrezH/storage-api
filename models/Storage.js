const mongoose = require('mongoose')

const schema = mongoose.Schema({
  displayName: {
    type: 'string',
    required: true,
    unique: true
  },
  type: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true
  },
  dimensions: {
    type: 'number',
    required: true
  },
  price: {
    type: 'number',
    required: true
  },
  available: {
    type: 'bool',
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  }
})


const model = mongoose.model('storage', schema)

module.exports = model
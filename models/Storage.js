const mongoose = require('mongoose')

const schema = mongoose.Schema({
  displayName: {
    type: 'string',
    required: true,
    unique: true
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
  },
  category: {
    type: 'objectId',
    ref: 'category',
    required: true
  }
})

schema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.image
  return obj
}

const model = mongoose.model('storage', schema)

module.exports = model
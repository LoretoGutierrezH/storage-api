const mongoose = require('mongoose')

const schema = mongoose.Schema({
  displayName: {
    type: 'string',
    required: true,
    unique: true
  }/* ,
  type: {
    type: 'string',
    required: true
  },
  description: {
    type: 'string',
    required: true
  } */,
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
    ref: 'category'
  }
})

schema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.image
  return obj
}

const model = mongoose.model('storage', schema)

module.exports = model
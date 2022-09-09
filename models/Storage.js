const mongoose = require('mongoose')

const schema = mongoose.Schema({
  displayName: {
    type: 'string',
    required: true,
    unique: true
  },
  category: {
    type: 'objectId',
    ref: 'category',
    required: true
  },
  dimensions: {
    type: 'object',
    width: 'number',
    height: 'number',
    depth: 'number',
    required: true
  },
  equivalentSize: {
    type: 'string',
    required: true
  },
  usage: {
    type: 'array',
    required: true
  },
  monthlyPrice: {
    type: 'number',
    required: true
  },
  isAvailable: {
    type: 'boolean',
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  }
})

schema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.image
  return obj
}

schema.methods.updateAvailability = function () {

}

const model = mongoose.model('storage', schema)

module.exports = model
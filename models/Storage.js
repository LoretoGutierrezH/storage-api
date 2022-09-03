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
    type: 'number',
    required: true
  },
  price: {
    type: 'number',
    required: true
  },
  availability: {
    type: 'object',
    unitsAvailable: {
      type: 'number',
      required: true
    },
    isAvailable: {
      type: 'boolean',
      required: true
    },
    reservationDates: [{ type: 'object', quantity: 'number', startDate: 'date', endDate: 'date' }],
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

const model = mongoose.model('storage', schema)

module.exports = model
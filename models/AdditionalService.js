const mongoose = require('mongoose')
//For future implementation
const schema = mongoose.schema({
  name: {
    type: 'string',
    required: true,
    unique: true
  },
  price: {
    type: 'int',
    required: true
  },
  image: {
    type: 'string',
    required: true
  }
})

const model = mongoose.model('additionalService', schema)

module.exports = model
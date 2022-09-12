const mongoose = require("mongoose")

const schema = mongoose.Schema({
  displayName: {
    type: 'string',
    required: true,
    unique: true
  },
  description: {
    type: 'string',
    required: true
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'storage' }],
  image: {
    data: Buffer,
    contentType: String
  }
})

const model = mongoose.model('category', schema)

module.exports = model
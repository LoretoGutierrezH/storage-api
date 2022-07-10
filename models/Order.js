const mongoose = require('mongoose')
const { utilErrorHandler } = require('../middlewares/errorHandler')
const Storage = require('./Storage')

const schema = mongoose.Schema({
  status: {
    type: 'string',
    enum: ['pending', 'scheduled', 'cancelled', 'fulfilled']  // enum pending, scheduled, fulfilled
  },
  user: {
    type: 'objectId',
    required: true,
    ref: 'user'
  },
  rentalPeriod: {  // rentalPeriod in weeks - min rentTime = 2 weeks 
    type: 'number',
    required: true
  },
  services: {
    type: 'object',
    storage: { type: 'objectId', ref: 'storage' },
    additionalServices: [{type: 'objectId', ref: 'additionalService'}], //TODO: Implement add. services
    required: true,
  },
  total: {
    type: 'number',
   /*  required: true */
  }
})

//updating storage availability and setting total (just storage price, for now)
//TODO: Logic for storage availability according to desired scheduled rentalPeriod start and end. 
schema.pre('save', function (next) {
  const storage = Storage.findByIdAndUpdate(this.services.storage, { available: false }, (err, doc) => {
    if (err) return utilErrorHandler(null, next, err)
    if (doc) this.total = doc.price
  })
  return next()
})

/* rentalPeriod: {
    timeInWeeks: {
        type: 'number' //internally calculated in pre save based on start and end
      }
      start: {
        
      },
      end: {
        
      }
    }
}
      
 */

const model = mongoose.model('order', schema)

module.exports = model
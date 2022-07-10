const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 
const {utilErrorHandler} = require('../middlewares/errorHandler')
const jwt = require('jsonwebtoken')

const schema = mongoose.Schema({
  firstName: {
    type: 'string',
    required: [() => true, 'A first name is required']
    },
  lastName: {
    type: 'string',
    required: [() => true, 'A lastname is required']
  },
  email: {
    type: 'string',
    required: [() => true, 'You must provide an email'],
    unique: true
    },
  password: {
    type: 'string',
    required: [() => true, 'Password is a required field']
  },
  address: {
    type: 'object',
    required: true,
    street: {
      type: 'string',
      required: true
    },
    numeration: {
      type: 'string',
      required: true
    },
    apartment: {
      type: 'string'
    },
    city: {
      type: 'string',
      required: true
    },
  },
  paymentInfo: {
    type: 'object'
  },
  currentServices: {
    type: 'array',
    items: {}
  },
  role: {
    type: 'string',
    required: true
  }
})

schema.pre('save', function(next)  {
  const saltRounds = 10
  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) return next(err)
    else {
      this.password = hashedPassword
      return next()
    }
  })
})

//User authentication
schema.methods.isCorrectPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

//Session token creation
schema.methods.getSessionToken = function () {
  const payload = {
    userId: this._id,
    role: this.role
  }
  const token = jwt.sign(payload, process.env.SESSION_TOKEN_KEY, { expiresIn: process.env.SESSION_TOKEN_EXPIRATION})
  return token
}




const model = mongoose.model('user', schema)

module.exports = model
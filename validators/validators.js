const { body } = require('express-validator')

const User = require('../models/User')
const Order = require('../models/Order')
const validationHandler = require('./validationHandler')

const paramsSignUp = [
  body('email')
    .isEmail()
    .withMessage('Please, provide a valid email address')
    .custom(value => {
      return User.findOne({email: value}).then(user => {
        if (user) return Promise.reject(`There's already an account with that email address`)
      })
    }),

    body("password")
    .isLength({ min: 8 })
    .withMessage("You need to provide a password with at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
    .withMessage("Your password must include letters, numbers and at least one of these symbols: @$.!%*#?&")  
]
const paramsLogIn = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("You need to provide a password with at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
    .withMessage("Your password must include letters, numbers and at least one of these symbols: @$.!%*#?&")

]

//TODO: Validation for order creation only when rentTime is greater than min and only when start and end dates are not scheduled for another user
const paramsOrder = [

]

const signUpValidator = [paramsSignUp, validationHandler]
const logInValidator = [paramsLogIn, validationHandler]
const orderValidator = []

module.exports = { 
  signUpValidator,
  logInValidator,
  orderValidator
}
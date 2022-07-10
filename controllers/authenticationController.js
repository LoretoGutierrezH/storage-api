const User = require('../models/User')
const bcrypt = require('bcrypt')
const {utilErrorHandler} = require('../middlewares/errorHandler')

const signUp = async (req, res) => {
  const user = new User(req.body) 
  await user.save()
  //after sign-up user should be logged in automatically
  return res.json({
    status: 'success',
    data: {
      newUser: {
        ...user._doc,
        password: 'hashed password placeholder'
      }
    }
    
  })
}

const logIn = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email })

  if (!user) return utilErrorHandler(user, next)

  const validationResult = user.isCorrectPassword(password)

  if (!validationResult) {
    const error = new Error('Invalid email or password')
    error.statusCode = 500
    return utilErrorHandler(user, next, error)
  }

  const token = user.getSessionToken()

  return res.json({
    status: "success",
    data: {
      user,
      token
    }
  })

}


module.exports = {signUp, logIn}
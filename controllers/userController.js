const User = require('../models/User')
const {utilErrorHandler} = require('../middlewares/errorHandler')

//Controller for user account administration
const getUsers = async (req, res) => {
  const users = await User.find()
  
  return res.json({
    users
  })
}

const getOneUser = async (req, res, next) => {
  const userId = req.params.id
  const user = await User.findById(userId)
  if (!user) return utilErrorHandler(user, next)

  return res.json({
    user
  })

}

//UPDATE USER

const deleteUser = async (req, res, next) => { //BUGGG!!! USER IS NOT DELETED!
  const userId = req.params.id

  const user = await User.findByIdAndDelete(userId)
  if (!user) return utilErrorHandler(user, next)
  
  const remainingUsers = await User.find()

  return res.json({
    remainingUsers
  })
} 

module.exports = {
  getUsers,
  getOneUser,
  deleteUser
}
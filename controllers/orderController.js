const { json } = require('express')
const User = require('../models/User')
const Order = require('../models/Order')
const Storage = require('../models/Storage')
const {getCurrentUserId} = require('../middlewares/authenticationHandler')
const { utilErrorHandler } = require('../middlewares/errorHandler')



const getOrders = async (req, res) => {
  const orders = await Order.find()
  
  return res.json({
    orders
  })
}


const getOrderDetails = async (req, res, next) => {
  const orderId = req.params.id
  const order = await Order.findById(orderId)
  console.log(order)
  if (!order) return utilErrorHandler(order, next)

  const user = await User.findById(order.user)

  if (user) {
   await order.populate('user')
  }

  await order.populate({path: 'services.storage', model: 'storage'})

  res.json({
    status: 'success',
    data: {
      order
    }
  })
}

const newOrder = async (req, res, next) => {
  const userId = getCurrentUserId(req, next)
  const storageAvailability = (await Storage.findById(req.body.services.storage)).available

  if (!storageAvailability) {
    const err = new Error('That storage alternative is already scheduled for another user.')
    return utilErrorHandler(null, next, err)
  }
  
  const data = {
    status: 'pending',
    user: userId,
    rentalPeriod: req.body.rentalPeriod,
    services: req.body.services,
  }


  const order = new Order(data)
  await order.save()
 
  return res.json({
    status: 'success',
    data: {
      order
    }
  })
}

const updateOrderStatus = (req, res) => {

}

//for dev purposes
const deleteAllOrders = async (req, res) => {
  const orders = await Order.find().deleteMany()

  return res.json({
    status: 'success',
    data: {
      orders: []
    }
  })
}

const deleteOrder = (req, re) => {

}

module.exports = {
  newOrder,
  getOrders,
  getOrderDetails,
  deleteAllOrders
}

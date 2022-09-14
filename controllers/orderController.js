const { json } = require('express')
const User = require('../models/User')
const Order = require('../models/Order')
const Storage = require('../models/Storage')
const { getCurrentUserId } = require('../middlewares/authenticationHandler')
const { utilErrorHandler } = require('../middlewares/errorHandler')



const getOrders = async (req, res) => {
  const orders = await Order.find()

  return res.json({
    orders
  })
}

const getUserOrders = async (req, res, next) => {
  const id = req.params.id
  const user = await User.findById(id)
  const orders = await Order.find({ user: user._id })

  res.json({
    status: 'success',
    data: {
      orders
    }
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

  await order.populate({ path: 'services.storage', model: 'storage' })

  res.json({
    status: 'success',
    data: {
      order
    }
  })
}

const newOrder = async (req, res, next) => {
  const userId = getCurrentUserId(req, next)

  req.body.services.storageUnits.forEach(async storage => {
    const storageAvailability = (await Storage.findById(storage.id)).isAvailable
    if (!storageAvailability) {
      const err = new Error('That storage alternative is already scheduled for another user.')
      return utilErrorHandler(null, next, err)
    }
  })


  // req.body.services.storageUnits


  const data = {
    status: 'pending',
    user: userId,
    services: req.body.services,
    rentalPeriod: req.body.rentalPeriod
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

const updateOrderStatus = async (req, res, next) => {
  const id = req.params.id
  const status = req.body.status
  const validStatus = ['scheduled', 'cancelled', 'fulfilled']
  const isValidStatus = validStatus.includes(status)

  if (!isValidStatus) {
    const err = new Error('Invalid update status.')
    return utilErrorHandler(null, next, err)
  }

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true })

  if (!order) {
    return utilErrorHandler(order, next)
  }

  if (order.status === 'fulfilled' || order.status === 'cancelled') {
    const storageId = order.services.storage
    await Storage.findByIdAndUpdate(storageId, { available: true })
  }

  res.json({
    order
  })
}



module.exports = {
  newOrder,
  getOrders,
  getOrderDetails,
  deleteAllOrders,
  updateOrderStatus,
  getUserOrders
}

const router = require('express').Router()
const {newOrder, getOrders, getOrderDetails, deleteAllOrders, updateOrderStatus} = require('../../controllers/orderController')

router.route('/orders').get(getOrders).post(newOrder).delete(deleteAllOrders)
router.route('/order/:id').get(getOrderDetails).put(updateOrderStatus)

module.exports = router
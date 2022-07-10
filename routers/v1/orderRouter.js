const router = require('express').Router()
const {newOrder, getOrders, getOrderDetails, deleteAllOrders} = require('../../controllers/orderController')

router.route('/orders').get(getOrders).post(newOrder).delete(deleteAllOrders)
router.route('/order/:id').get(getOrderDetails)

module.exports = router
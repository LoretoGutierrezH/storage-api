const router = require('express').Router()
const authorize = require('../../middlewares/authorizationHandler')

const { newOrder, getOrders, getOrderDetails, deleteAllOrders, updateOrderStatus, getUserOrders } = require('../../controllers/orderController')

router.route('/orders').get((req, res, next) => authorize(req, ['admin'], next), getOrders).post(newOrder).delete(deleteAllOrders)
router.route('/users/:id/orders').get(getUserOrders)
//lógica para detalles de orden específica del usuario conectado
router.route('/order/:id').get(getOrderDetails).put(updateOrderStatus)

module.exports = router
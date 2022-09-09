const router = require('express').Router()
const { newCategory, getCategories, getCategoryDetails, deleteAllProductsFromCategory } = require('../../controllers/categoryController')

router.route('/categories').get(getCategories).post(newCategory)
router.route('/category/:id').get(getCategoryDetails).delete(deleteAllProductsFromCategory)

module.exports = router
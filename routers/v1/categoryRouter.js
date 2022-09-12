const router = require('express').Router()
const { newCategory, getCategories, getCategoryDetails, deleteAllProductsFromCategory, addImageToCategory, getCategoryImage } = require('../../controllers/categoryController')

router.route('/categories').get(getCategories).post(newCategory)
router.route('/category/:id').get(getCategoryDetails).delete(deleteAllProductsFromCategory).put(addImageToCategory)
router.route('/category/image/:id').get(getCategoryImage)

module.exports = router
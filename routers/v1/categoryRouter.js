const router = require('express').Router()
const { newCategory, getCategories, getCategoryDetails } = require('../../controllers/categoryController')

router.route('/categories').get(getCategories).post(newCategory)
router.route('/category/:id').get(getCategoryDetails)

module.exports = router
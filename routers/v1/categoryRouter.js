const router = require('express').Router()
const { newCategory, getCategories } = require('../../controllers/categoryController')

router.route('/categories').get(getCategories).post(newCategory)

module.exports = router
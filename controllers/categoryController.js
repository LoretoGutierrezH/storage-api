const Category = require('../models/Category')
const { utilErrorHandler } = require('../middlewares/errorHandler')

const newCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body)
  } catch (error) {
    return utilErrorHandler(null, next, error)
  }

  return res.json({
    status: 'success',
    data: {
      newCategory
    }
  })
}

const getCategories = async (req, res) => {
  const categories = await Category.find()
  res.json({
    status: 'successs',
    data: {
      categories
    }
  })
}

const getCategoryDetails = async (req, res, next) => {
  const id = req.params.id
  const category = await Category.findById(id).populate('products')
  if (!category) return utilErrorHandler(category, next)

  res.json({
    status: 'succcess',
    data: {
      category
    }
  })
}

const addProductToCategory = (req, res, next) => {

}

module.exports = {
  newCategory,
  getCategories,
  getCategoryDetails
}
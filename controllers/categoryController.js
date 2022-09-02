const Category = require('../models/Category')

const newCategory = async (req, res, next) => {

  const newCategory = await Category.create(req.body)

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

const addProductToCategory = (req, res, next) => {

}

module.exports = {
  newCategory,
  getCategories
}
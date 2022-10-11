const Category = require('../models/Category')
const { utilErrorHandler } = require('../middlewares/errorHandler')
const Storage = require('../models/Category')
const { json } = require('express')

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

const updateCategoryInfo = async (req, res, next) => {
  const id = req.params.id
  let category;
  if (req.files) {
    category = await Storage.findByIdAndUpdate(id, { displayName: req.body.displayName, description: req.body.description, image: { data: req.files.image.data, contentType: req.files.image.mimetype } }, { new: true })
  } else {
    category = await Category.findByIdAndUpdate(id, { displayName: req.body.displayName, description: req.body.description }, { new: true })
  }

  return res.json({
    category
  })

}

const deleteAllProductsFromCategory = async (req, res) => {
  const id = req.params.id

  const category = await Category.findByIdAndUpdate(id, { products: [] }, { new: true })


  res.json({
    status: 'success',
    data: {
      category
    }
  })
}

const addImageToCategory = async (req, res) => {
  const id = req.params.id
  let category;
  if (req.files) {
    category = await Category.findByIdAndUpdate(id, { image: { data: req.files.image.data, contentType: req.files.image.mimetype } })
  }

  res.json({
    status: 'success',
    data: {
      category
    }
  })
}

const getCategoryImage = async (req, res, next) => {
  const id = req.params.id
  const category = await Category.findById(id)

  if (!category) return utilErrorHandler(category, next)

  res.set('Content-Type', category.image.contentType)
  res.send(category.image.data)

}

/* const addStorageToCategoryProducts = async (req, res) => {
  const storageUnits = await Storage.find()
  let category;
  storageUnits.forEach(async unit => {
    category = await Category.findByIdAndUpdate(unit.category, { "$push": { "products": unit.id } }, { new: true })
  })

  res.json({
    status: 'success',
    data: {
      category
    }
  })
} */

module.exports = {
  newCategory,
  getCategories,
  getCategoryDetails,
  deleteAllProductsFromCategory,
  addImageToCategory,
  getCategoryImage,
  updateCategoryInfo
}
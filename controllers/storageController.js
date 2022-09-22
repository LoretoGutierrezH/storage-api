const { utilErrorHandler } = require('../middlewares/errorHandler')
const Storage = require('../models/Storage')
const Category = require('../models/Category')
const mongoose = require('mongoose')

const getStorageUnits = async (req, res) => {
  const storageAlternatives = await Storage.find().populate('category')

  storageAlternatives.forEach(unit => {
     unit._doc.category.image.data = 'hidden'
  })
  return res.json({
    storages: storageAlternatives
  })

}


const newStorage = async (req, res) => {
  const storage = new Storage(req.body)
  const id = storage.id
  console.log(mongoose.isValidObjectId(storage.id))
  const category = await Category.findByIdAndUpdate(req.body.category, { "$push": { "products": id } }, { new: true })

  if (req.files) {
    storage.image.data = req.files.image.data
    storage.image.contentType = req.files.image.mimetype
  }

  await storage.save()

  return res.json({
    storage
  })
}

const getStorageDetails = async (req, res, next) => {
  const storageId = req.params.id
  const storage = await Storage.findById(storageId).populate('category')
  if (!storage) return utilErrorHandler(storage, next)

  return res.json({
    storage
  })
}


const addStorageToCategoryProducts = (req, res) => {

}

const deleteStorage = async (req, res) => {
  const storageId = req.params.id

  const storage = await Storage.findByIdAndDelete(storageId)
  const remainingStorageAlternatives = await Storage.find()

  return res.json({
    remainingStorageAlternatives
  })
}

const deleteAllStorageUnits = async (req, res) => {
  const storages = await Storage.find().deleteMany()

  return res.json({
    status: 'success',
    data: {
      storages: []
    }
  })
}

const getStorageImage = async (req, res, next) => {
  const id = req.params.id
  const storage = await Storage.findById(id)

  if (!storage) return utilErrorHandler(storage, next)

  res.set('Content-Type', storage.image.contentType)
  res.send(storage.image.data)

}



module.exports = {
  newStorage,
  getStorageUnits,
  deleteStorage,
  getStorageImage,
  getStorageDetails,
  deleteAllStorageUnits
}

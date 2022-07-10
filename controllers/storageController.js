const { utilErrorHandler } = require('../middlewares/errorHandler')
const Storage = require('../models/Storage')

const getStorageAlternatives = async (req, res) => {
  const storageAlternatives = await Storage.find()

  return res.json({
    storages: storageAlternatives
  })

}

const newStorage = async (req, res) => {
  const storage = new Storage(req.body)

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
  const storage = await Storage.findById(storageId)
  if (!storage) return utilErrorHandler(storage, next)

  return res.json({
    storage
  })
}


const updateStorage = (req, res) => {

}

const deleteStorage = async (req, res) => {
  const storageId = req.params.id

  const storage = await Storage.findByIdAndDelete(storageId)
  const remainingStorageAlternatives = await Storage.find()

  return res.json({
    remainingStorageAlternatives
  })
}

const getStorageImage = async (req, res, next) => {
  const id = req.params.id
  const storage = await Storage.findById(id)

  if (!storage) {
    const err = new Error('Not found')
    err.statusCode = 404
    return utilErrorHandler(storage, next, err)
  }

  res.set('Content-Type', storage.image.contentType)
  res.send(storage.image.data)

}



module.exports = {
  newStorage,
  getStorageAlternatives,
  deleteStorage,
  getStorageImage,
  getStorageDetails
}

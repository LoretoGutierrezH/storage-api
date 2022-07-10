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

const deleteStorage = async (req, re) => {
  const storageId = req.params.id

  const storage = await Storage.findOneAndDelete(storageId)
  const remainingStorageAlternatives = await Storage.find()

  return res.json({
    remainingStorageAlternatives
  })
}



module.exports = {
  newStorage,
  getStorageAlternatives
}

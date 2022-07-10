const router = require('express').Router()
const {newStorage, getStorageAlternatives} = require('../../controllers/storageController')

/**
 * @swagger
 * /storages:
 *   post:
 *     summary: Create a storage alternative
 *     tags: [Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Storage"
 *     responses:
 *       200: 
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Storage"
 *       500:
 *         description: bad request
 *   get:
 *     summary: Get a list of all storage alternatives
 *     tags: [Storage]
 *     requestBody:
 *       required: false
 *     responses:
 *       200: 
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: "#/components/schemas/Storage"
 *       500:
 *         description: bad request
 *       
 */

router.route('/storages').get(getStorageAlternatives).post(newStorage)

/**
 * @swagger
 * components:
 *   schemas:
 *     Storage:
 *       type: object
 *       required:
 *         - displayName
 *         - type
 *         - description
 *         - dimensions
 *         - price
 *         - available
 *       properties:
 *         displayName:
 *            type: string
 *         type:
 *            type: string
 *         description:
 *            type: string
 *         dimensions:
 *            type: number
 *         price:
 *            type: number
 *         available: 
 *            type: bool
 *       example:
 *         displayName: Big-Ass Storage 2
 *         type: L-Size
 *         description: Spacious storage space to store securely your whole life... and more.
 *         dimensions: 27
 *         price: 200
 *         available: true 
 *            
 */

module.exports = router
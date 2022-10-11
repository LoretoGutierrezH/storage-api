const router = require('express').Router()
const { getUsers, getOneUser, newUser, deleteUser } = require('../../controllers/userController')
const { signUp, logIn } = require('../../controllers/authenticationController')
const authorize = require('../../middlewares/authorizationHandler')
const { isAuth, renewToken } = require('../../middlewares/authenticationHandler')
const { signUpValidator, logInValidator } = require('../../validators/validators')

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200: 
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       500:
 *         description: jwt expired     
 */



router.route('/users').get((req, res, next) => authorize(req, ['admin'], next), getUsers).post(signUp)
router.route('/user/:id').get((req, res, next) => authorize(req, ['admin'], next), getOneUser).delete((req, res, next) => authorize(req, ['admin'], next), deleteUser)

//Authentication
router.route('/signup').post(signUpValidator, signUp)
router.route('/login').post(logInValidator, logIn)
router.route('/token/renew').get((req, res, next) => authorize(req, ['admin', 'user'], next), isAuth, renewToken)


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - address
 *         - role
 *       properties:
 *         firstName:
 *            type: string
 *         lastName:
 *            type: string
 *         email:
 *            type: string
 *         password:
 *            type: string
 *         address:
 *            type: object
 *            street: 
 *              type: string
 *            numeration:
 *              type: number
 *            apartment:
 *              type: number
 *            city:
 *              type: string
 *         role: 
 *            type: string
 *       example:
 *         firstName: Mariano
 *         lastName: Fernandez
 *         email: m.fernandez@gmail.com
 *         password: mariano1980*
 *         address: { street: vicuña mackena, numeration: 1456, apartment: 506, city: Santiago}
 *         role: user 
 *            
 */

module.exports = router

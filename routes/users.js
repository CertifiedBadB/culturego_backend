const express = require("express");

const router = express.Router();
const Path = require("../model/Path");
const User = require("../model/User");
const userController = require("../controllers/userController");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


/**
 *
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:           
 *             type: http
 *             scheme: bearer
 **/

/**
 * @swagger
 * /users/signup:
 *   post:
 *      tags:
 *        - users (authorization)
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       500:
 *         description: Internal server error
 */

router.post('/signup', userController.signup_post);

/**
 * @swagger
 * /users/login:
 *  post:
 *      tags:
 *        - users (authorization)
 *      summary: Use this call to log in CultureGo users this authorizes locked calls
 *      description: The body needs an email and a password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email of the user
 *                              example: "user@example.com"
 *                              required: true
 *                          password:
 *                              type: string
 *                              description: Password of the user
 *                              example: "password123"
 *                              required: true
 *      security:
 *           - bearerAuth: []  
 *      responses:
 *          200:
 *              description: Successful login
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/login', userController.login_post);

router.get('/logout', userController.logout_get);
module.exports = router;

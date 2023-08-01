const express = require("express");
const router = express.Router();
const Path = require("../model/Path");
const User = require("../model/User");
const userController = require("../controllers/userController");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const verifyToken = require('../verifyToken');


/**
 * @swagger
 * /users/signup:
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
 *
 *      responses:
 *          200:
 *              description: Successful login
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
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
 *
 *      responses:
 *          200:
 *              description: Successful login
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/login', userController.login_post);


/**
 * @swagger
 *  /users/getById:
 *  post:
 *      tags:
 *        - users (needs autorization)
 *      summary: Use this call to see a users details
 *      security:
 *          - Bearer: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: Title of the path
 *                              example: "fddsf3dfs4gfds"
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful checked a user
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/getById',verifyToken, userController.getById);

/**
 * @swagger
 *  /users/updatePoints:
 *  post:
 *      tags:
 *        - users (needs autorization)
 *      summary: Use this call to see a users details
 *      security:
 *          - Bearer: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: String
 *                              description: Title of the path
 *                              example: "fdsfi344lfgd"
 *                              required: true
 *                          points:
 *                              type: int
 *                              description: Title of the path
 *                              example: 2
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful checked a user
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/updatePoints',verifyToken, userController.getByIdAndUpdatePoints);

/**
 * @swagger
 * /users/passwordreset1:
 *  post:
 *      tags:
 *        - users (authorization)
 *      summary: Use this call to get a password reset token
 *      description: The body needs an email
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
 *      responses:
 *          200:
 *              description: Successful login
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/passwordreset1', userController.passwordreset1);

/**
 * @swagger
 * /users/passwordreset2:
 *  post:
 *      tags:
 *        - users (authorization)
 *      summary: Use this call to reset the password
 *      description: The body needs an email, token and newpassword
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
 *                          token:
 *                              type: string
 *                              description: token of the user
 *                              example: "uUhGr5"
 *                              required: true
 *                          newPassword:
 *                              type: string
 *                              description: password of the user
 *                              example: "uUhGr5"
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful login
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/passwordreset2', userController.passwordreset2);

router.get('/logout', userController.logout_get);
module.exports = router;

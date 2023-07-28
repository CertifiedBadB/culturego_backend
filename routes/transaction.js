const express = require("express");

const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authorize = require("../routes")
const app = express();

/** 
 * @swagger
 *  /transaction/postTransaction:
 *  post:
 *      tags:
 *        - transaction (needs autorization)
 *      summary: Use this call to send points
 *      security:
 *          - Bearer: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: String
 *                              description: user id
 *                              example: '4nkj43284ghbd'
 *                              required: true
 *                          pascode:
 *                              type: int
 *                              description: SamenDoen code
 *                              example: 4
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful get points
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */

router.post('/postTransaction', transactionController.transaction_post);
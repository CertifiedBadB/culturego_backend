const express = require("express");

const router = express.Router();
const pointController = require("../controllers/pointController");
const authorizr = require("../routes")
router.post('/', pointController.point_post);
const app = express();


/** 
 * @swagger
 *  /points/generateRandomPath:
 *  get:
 *      tags:
 *        - points (needs autorization)
 *      summary: Use this call to get value amount of points, based on your location in latitude and longtitude
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          latitude:
 *                              type: int
 *                              description: Latitude of the user
 *                              example: 5
 *                              required: true
 *                          longitude:
 *                              type: int
 *                              description: Longtitude of the user
 *                              example: 4
 *                              required: true
 *                          value:
 *                              type: int
 *                              description: get this amount of points
 *                              example: 10
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful get points
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */

router.get('/generateRandomPath', pointController.point_get);


/**
 * @swagger
 *  /points/dummydata:
 *  post:
 *      tags: 
 *        - points (needs autorization)
 *      summary: Use this call to add some dummydata to the database
 *      requestBody:
 *          required: false
 *
 *      security:
 *         - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successful get points
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/dummydata', pointController.createDummyData);
//router.delete('/delete:_id', userController.path_delete);


module.exports = router;
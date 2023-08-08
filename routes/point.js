const express = require("express");

const router = express.Router();
const pointController = require("../controllers/pointController");
const authorize = require("../routes")
router.post('/', pointController.point_post);
const app = express();


/** 
 * @swagger
 *  /points/generateRandomPath:
 *  post:
 *      tags:
 *        - points (needs authorization)
 *      summary: Use this call to get value amount of points, based on your location in latitude and longtitude
 *      security:
 *          - Bearer: []
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

router.post('/generateRandomPath', pointController.point_get);


/**
 * @swagger
 *  /points/dummyData:
 *  post:
 *      tags: 
 *        - points (needs authorization)
 *      summary: Use this call to add some dummydata to the database
 *      requestBody:
 *          required: false
 *
 *      security:
 *          - Bearer: []
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
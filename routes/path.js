const express = require("express");
const router = express.Router();
const pathController = require("../controllers/pathController");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

/** 
 * @swagger
 * components:
 *  securitySchemes:
 *      Bearer:
 *          type: http
 *          scheme: bearer
 * 
 * @swagger
 *  /paths:
 *  post:
 *      tags:
 *        - paths (needs autorization)
 *      summary: Use this call to post a path
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: Title of the path
 *                              example: "Bergen op zoom route"
 *                              required: true
 *                          description:
 *                              type: string
 *                              description: Description of the path
 *                              example: "Een route in bergen op zoom"
 *                              required: true
 *                          photo:
 *                              type: string
 *                              description: get this amount of points
 *                              example: "photo.jpg"
 *                              required: false
 *                          points:
 *                              type: int
 *                              description: get this amount of points
 *                              example: 10
 *                              required: true
 *                          collected:
 *                              type: int
 *                              description: get this amount of points
 *                              example: 10
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful deleted a path
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/', pathController.path_post);
router.get('/', pathController.path_get);



/** 
 * @swagger
 *  /paths/delete:
 *  delete:
 *      tags:
 *        - paths (needs autorization)
 *      summary: Use this call to delete a path
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              description: the id
 *                              example: 5e234ewr3ewr
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful deleted a path
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.delete('/delete', pathController.path_delete);

/**
 * @swagger
 *  /paths/dummydata:
 *  post:
 *      tags: 
 *        - paths (needs autorization)
 *      summary: Use this call to add some dummydata to the database
 *      security:
 *        - [{ "Bearer": [] }]
 *      requestBody:
 *          required: false
 *      responses:
 *          200:
 *              description: Successful get path
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/dummydata', pathController.createDummyData);


router.post('/dummydata', pathController.addPoint);

module.exports = router;
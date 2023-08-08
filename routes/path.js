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
 *  /paths/post:
 *  post:
 *      tags:
 *        - paths (needs authorization)
 *      summary: Use this call to post a path
 *      security:
 *          - Bearer: []
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
router.post('/post', pathController.path_post);

/** 
 * @swagger
 *  /paths/get:
 *  get:
 *      tags:
 *        - paths (needs authorization)
 *      summary: Use this call to get all paths
 *      security:
 *          - Bearer: []
 *      requestBody:
 *          required: false
 *      responses:
 *          200:
 *              description: Successful deleted a path
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.get('/get', pathController.path_get);



/** 
 * @swagger
 *  /paths/delete:
 *  delete:
 *      tags:
 *        - paths (needs authorization)
 *      summary: Use this call to delete a path
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
 *  /paths/dummyData:
 *  post:
 *      tags: 
 *        - paths (needs authorization)
 *      summary: Use this call to add some dummydata to the database
 *      security:
 *          - Bearer: []
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

/** 
 * @swagger
 *  /paths/pushPoint:
 *  post:
 *      tags:
 *        - paths (needs authorization)
 *      summary: Use this call to post a point into a path
 *      security:
 *          - Bearer: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          pathId:
 *                              type: String
 *                              description: String
 *                              example: "dsfigdish4regfrt79ytf"
 *                              required: true
 *                          point:
 *                              type: Point
 *                              description: a point
 *                              example: {
 *                                  "description": "Hotel de Draak (vroeger De Draeck) is een hotel gelegen aan de Grote Markt in Bergen op Zoom. Het is het oudste hotel van Nederland.Het huidige Hotel de Draak, aan de Grote Markt 38, is gevestigd in een pand uit 1397 dat het resultaat is van een ingrijpende verbouwing. De met tongewelven overdekte kelders stammen nog uit het 14e-eeuwse pand.",
 *                                  "location":{"coordinates": [51.49458617537634, 4.286523179756908]},
 *                                  "value":1,
 *                                  "question":{"question" : "Hier de vraag ? ","photo":"photoUrl","badAnswers":["a","b"],"goodAnswer":"c","value":1},
 *                                  "photo": "https://i.pinimg.com/736x/7a/60/cb/7a60cb463e52b7173817f4373b099aab--bergen-zoom.jpg"
 *                              }
 *                              required: true
 *      responses:
 *          200:
 *              description: Successful deleted a path
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */
router.post('/pushpoint', pathController.addPoint);

router.delete('/removePoint', pathController.deletePoint);

module.exports = router;
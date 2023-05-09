var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-dist');

/* GET users listing. */
router.use('/api-docs', express.static(swaggerUi.getAbsoluteFSPath()));

router.get('/hello', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

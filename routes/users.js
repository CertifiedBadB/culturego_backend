var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/api-docs', express.static(swaggerUi.getAbsoluteFSPath()));

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

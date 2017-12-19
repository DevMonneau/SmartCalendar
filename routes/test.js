var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/bite', function(req, res, next) {
  res.render('test');
});

module.exports = router;

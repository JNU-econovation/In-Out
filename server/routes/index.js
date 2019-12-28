var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('/public/index.html', (err, data)=>{
    res.end(data);
  });
});

module.exports = router;

var express = require("express");
var fs = require("fs");
var router = express.Router();
var indexController = require("../controller/index");

/* GET home page. */
router.get("/", indexController.getIndexPage);

module.exports = router;

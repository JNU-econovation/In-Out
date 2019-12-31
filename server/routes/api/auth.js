var express = require("express");
var router = express.Router();
var authController = require("../../controller/api/auth.js");

router.post("/login", authController.login);
router.post("/insert", authController.tmpInsert);

module.exports = router;

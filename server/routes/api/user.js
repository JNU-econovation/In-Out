var express = require("express");
var router = express.Router();
var userController = require("../../controller/api/user");

router.put("/update", userController.updatePassword);

module.exports = router;

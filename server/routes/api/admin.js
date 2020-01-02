var express = require("express");
var router = express.Router();
var authControlloer = require('./../../controller/api/auth');
var adminController = require('./../../controller/api/admin');

//router.use(authControlloer.verifyToken);
//router.use(adminController.isAdmin);
router.post("/members", adminController.createUser);
router.put("/members/update", adminController.changeRole);

module.exports = router;
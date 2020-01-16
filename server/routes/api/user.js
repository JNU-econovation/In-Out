const express = require("express");
const router = express.Router();
const userController = require("../../controller/api/user");

router.put("/", userController.updatePassword);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../../controller/api/user");
const authController = require("./../../controller/api/auth");

router.use(authController.verifyToken);
router.put("/", userController.updatePassword);

module.exports = router;

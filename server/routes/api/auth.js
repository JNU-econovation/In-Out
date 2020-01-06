const express = require("express");
const router = express.Router();
const authController = require("../../controller/api/auth.js");

router.post("/login", authController.login);

module.exports = router;

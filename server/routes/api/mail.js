const express = require("express");
const router = express.Router();
const authController = require("./../../controller/api/auth");
const adminController = require("./../../controller/api/admin");
const mailController = require("../../controller/api/mail");

router.use(authController.verifyToken);
router.use(adminController.isAdmin);
router.get("/submit", mailController.toProfessor);

module.exports = router;

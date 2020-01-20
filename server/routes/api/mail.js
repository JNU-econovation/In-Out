const express = require("express");
const router = express.Router();
const mailController = require("../../controller/api/mail");

router.get("/submit", mailController.toProfessor);

module.exports = router;

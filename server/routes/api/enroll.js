const express = require("express");
const router = express.Router();
const enrollController = require("../../controller/api/enroll");

router.get("/:memberId", enrollController.showEnrollment);
router.post("/process", enrollController.createEnrollment);
router.put("/process", enrollController.updateEnrollment);

module.exports = router;

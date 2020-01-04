const express = require("express");
const router = express.Router();
const authControlloer = require("./../../controller/api/auth");
const adminController = require("./../../controller/api/admin");
const enrollmentController = require("./../../controller/api/enroll");

//router.use(authControlloer.verifyToken);
//router.use(adminController.isAdmin);
router.post("/members", adminController.createUser);
router.put("/members/update", adminController.changeRole);
router.get("/enrollments", enrollmentController.showEnrollmentsByDate);

module.exports = router;

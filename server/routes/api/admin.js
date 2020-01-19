const express = require("express");
const router = express.Router();
const authController = require("./../../controller/api/auth");
const adminController = require("./../../controller/api/admin");
const enrollmentController = require("./../../controller/api/enroll");

router.use(authController.verifyToken);
router.use(adminController.isAdmin);
router.post("/members", adminController.createUser);
router.put("/members/update", adminController.changeRole);
router.get("/enrollments", enrollmentController.showEnrollmentsByDate);

module.exports = router;

var express = require('express');
var router = express.Router();
var enrollController = require('../../controller/api/enroll');

/* GET home page. */
router.get('/processed', enrollController.showEnrollment);
router.post('/process', enrollController.createEnrollment);
// router.put('/api/enrollment/process', enrollController.updateEnrollment);

module.exports = router;
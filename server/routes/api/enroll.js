var express = require('express');
var router = express.Router();
var enrollController = require('../../controller/api/enroll');

/* GET home page. */
router.get('/', enrollController.showEnrollment);
router.post('/process', enrollController.createEnrollment);
router.put('/process', enrollController.updateEnrollment);

module.exports = router;
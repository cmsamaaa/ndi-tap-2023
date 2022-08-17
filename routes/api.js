const express = require('express');

const apiController = require('../controllers/api');

const router = express.Router();

router.post('/createProfile', apiController.createProfile);
router.get('/getProfile/:code', apiController.getProfile);

module.exports = router;
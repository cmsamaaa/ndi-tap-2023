const express = require('express');

const frontendController = require('../controllers/backend');

const router = express.Router();

router.post('/register', frontendController.register);

module.exports = router;
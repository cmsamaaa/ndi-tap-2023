const express = require('express');

const frontendController = require('../controllers/frontend');

const router = express.Router();

router.get('/viewProfile/:code', frontendController.viewProfile);

module.exports = router;
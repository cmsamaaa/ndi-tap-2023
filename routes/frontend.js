const express = require('express');

const frontendController = require('../controllers/frontend');

const router = express.Router();

router.get('/viewProfile', frontendController.viewProfile);
router.get('/verifyProfile', frontendController.verifyProfile);

module.exports = router;
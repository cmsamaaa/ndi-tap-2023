const express = require('express');

const frontendController = require('../controllers/frontend');

const router = express.Router();

router.get('/', frontendController.viewIndex);
router.get('/viewProfile', frontendController.viewProfile);
router.get('/verify', frontendController.verify);
router.get('/register', frontendController.register);
router.get('/myinfo', frontendController.myinfo);

module.exports = router;
const express = require('express');

const frontendController = require('../controllers/frontend');

const router = express.Router();

router.get('/', frontendController.viewIndex);
router.get('/index', frontendController.viewIndex);
router.get('/profileCard', frontendController.profileCard);
router.get('/verify', frontendController.verify);
router.get('/register', frontendController.register);
router.get('/login', frontendController.login);
router.get('/myinfo', frontendController.myinfo);
router.get('/myinfoBusiness', frontendController.myinfoBusiness);

module.exports = router;
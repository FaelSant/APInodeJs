'use strict'

const express = require('express')
const router = express.Router();
const orderController = require('../controllers/order-controller')
const authService = require('../services/auth-services')


router.post('/',authService.authorize, orderController.posts);
router.get('/',authService.authorize, orderController.get);


module.exports = router;

'use strict'

const express = require('express')
const router = express.Router();
const customerController = require('../controllers/customer-controller')
const authService = require('../services/auth-services')


const create = router.post('/',customerController.posts);
const deletar = router.delete('/:id',customerController.delete);
const get = router.get('/',customerController.get);
const autheticate = router.post('/authenticate',customerController.authenticate)
router.post('/refresh-token',authService.authorize, customerController.refreshToken)

module.exports = router;

'use strict'

const express = require('express')
const router = express.Router();
const produtoController = require('../controllers/produto-controller')
const authService = require('../services/auth-services');
//criando produto
const create = router.post('/',produtoController.posts);
//atualizar um produto
const put = router.put('/:id',authService.isAdmin,produtoController.put);
//deletar um produto
const del = router.delete('/:id',authService.isAdmin,produtoController.delete);
//listar os produtos
const get = router.get('/',produtoController.get);
//listar os produtos por slug
const getBySlugs = router.get('/:slug',produtoController.getBySlugs);
//listar os produtos por id
const getById = router.get('/ad/:id',produtoController.getById);
//listar os produtos passando tags
const getByTags = router.get('/tag/:tags',produtoController.getByTags);
module.exports = router;


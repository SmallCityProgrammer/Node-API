'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/product-controller');
const authService = require('../services/auth-service')

router.get('/', controller.get);
router.get('/admin/:id', controller.getById);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router;
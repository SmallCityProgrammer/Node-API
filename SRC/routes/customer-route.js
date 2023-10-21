'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../Controllers/customer-controller')


router.post('/', controller.post);
router.post('/authenticate', controller.post);

module.exports = router;
const express = require('express');
const router = express.Router();

// Require category controller module
const category_controller = require('../controllers/categoryController');

/// CATEGORY ROUTES ///

// GET request for one category
router.get('/:id', category_controller.category_detail);

module.exports = router;
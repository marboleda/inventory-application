const express = require('express');
const router = express.Router();
const upload = require('./index').upload;

// Require category controller module
const category_controller = require('../controllers/categoryController');

/// CATEGORY ROUTES ///

// GET request for one category
router.get('/:id', category_controller.category_detail);

// POST request to create new item for a specific category
router.post('/:id/create_item', upload.single('itemImage'), category_controller.category_create_item);

module.exports = router;
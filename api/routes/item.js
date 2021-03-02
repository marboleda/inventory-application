const express = require('express');
const router = express.Router();

// Require item controller module
const item_controller = require('../controllers/itemController');

/// ITEM ROUTES ///

// GET request for an item
router.get('/:id', item_controller.item_detail);

module.exports = router;
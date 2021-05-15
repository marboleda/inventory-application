const express = require('express');
const router = express.Router();
const upload = require('./index').upload;

// Require item controller module
const item_controller = require('../controllers/itemController');

/// ITEM ROUTES ///

// GET request for an item
router.get('/:id', item_controller.item_detail);
router.post('/:id', upload.single('itemImage'), item_controller.item_update_post);
router.delete('/:id', item_controller.item_delete);

module.exports = router;
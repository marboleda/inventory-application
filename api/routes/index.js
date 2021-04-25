const express = require('express');
const router = express.Router();
// Set up Multer here than export to be available to the other routers
const multer = require('multer');
const path = require('path');


// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage
});


const category_controller = require('../controllers/categoryController');

/* GET home page. */
router.get('/', category_controller.index);

exports.router = router;
exports.upload = upload;
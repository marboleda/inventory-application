const { body, validationResult } = require('express-validator');
const Category = require('../models/category');

const async = require('async');

exports.index = (req, res, next) => {
    Category.find({}, 'name')
        .exec((err, categories) => {
            if (err) {return next(err); }
            // Successful, so send to client
            res.json(categories);
        })
}
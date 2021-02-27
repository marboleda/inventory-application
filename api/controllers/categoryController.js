const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');

exports.index = (req, res, next) => {
    Category.find({}, 'name')
        .exec((err, categories) => {
            if (err) {return next(err); }
            // Successful, so send to client
            res.json(categories);
        });
}

//Display details for a specific category (i.e. list of items)
exports.category_detail = (req, res, next) => {

    async.parallel({
        category: (callback) => {
            Category.findById(req.params.id)
                    .exec(callback);
        },
        category_items: (callback) => {
            Item.find({ 'category': req.params.id})
                .exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err); }
        if (results.category===null) { //i.e. no category found
            const err = new Error('Category not found!');
            err.status = 404;
            return next(err);
        }
        //Otherwise, successful. So return results.
        res.json({ category: results.category, category_items: results.category_items });
    });
}
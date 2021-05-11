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

exports.category_create_item = [
    //Validate and sanitize fields
    body('name', 'Name must be specified').trim().isLength({ min: 1 }).escape(),
    body('weight_num', 'weight_num must be a number').trim().isNumeric(),
    body('weight_unit', 'weight_unit must be a valid option').trim().
        custom((value) => ['kg', 'g', 'ml', 'l', 'oz', 'count'].includes(value)),
    body('price', 'price must be a number').trim().isNumeric(),
    body('stock', 'stock must be an integer').trim().isInt(),

   //Process request after validation and sanitization
   (req, res, next) => {

       // Extract validation errors from request if any
       const errors = validationResult(req);

        Category.findById(req.body.category).
            exec((err, category) => {
                if (err) { return next(err); }
                // Create an item instance with escaped and trimmed data.
                const item = new Item(
                    {
                        name: req.body.name,
                        weight_num: req.body.weight_num,
                        weight_unit: req.body.weight_unit,
                        price: req.body.price,
                        category: category._id,
                        stock: req.body.stock,
                        image_filename: req.file.filename
                    }
                )

                if (!errors.isEmpty()) {
                    //TODO: There are errors. Render form again with sanitized values/error messages
                } 
                else {
                    // Data from form is valid!
                    item.save((err) => {
                        if (err) { return next(err); }
                        // Successful - go to category item list
                        res.json('Item Created!');
                    });
                }
            });
    }       
];
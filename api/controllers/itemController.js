const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Item = require('../models/item');
const fs = require('fs');

const async = require('async');

// Display details for a specific item
exports.item_detail = (req, res, next) => {

    Item.findById(req.params.id)
        .exec((err, item) => {
            if (err) { return next(err); }
            //Successful, so return details to client
            res.json(item);
        });
}

// Handle item update on POST
exports.item_update_post = [

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

            async.parallel({
                currentItemState: (callback) => {
                    Item.findById(req.params.id).exec(callback);
                }
            }, function(err, results) {
                if (err) { return next(err); }
                if (!errors.isEmpty()) {
                    //TODO: There are errors. Render form again with sanitized values/error messages
                }
                else {
                    //Data from form is valid. Update the record
                    // Create an Item object with the escaped/trimmed data and current id.
                    const item = new Item(
                        { name: req.body.name,
                         weight_num: req.body.weight_num,
                        weight_unit: req.body.weight_unit,
                        price: req.body.price,
                        stock: req.body.stock,
                        _id: req.params.id,
                        category: results.currentItemState.category,
                        image_filename: req.file.filename
                        }
                    );

                    Item.findByIdAndUpdate(req.params.id, item, {}, (err, item) => {
                        if (err) { return next(err); }
                        // Successful - remove old image if new one was supplied and redirect to Item Detail page
                        if (req.body.filename !== '') {
                            fs.unlink(`public/images/${item.image_filename}`, (err) => {
                                if (err) console.log(err);
                                console.log('Image successfully updated');
                            });
                        }
                        res.json({
                            message: 'Item updated successfully!'
                        });
                    });                    
                }
               }
            );
    }
];

// Handle item delete
exports.item_delete = (req, res, next) => {

    Item.findById(req.params.id)
        .exec((err, item) => {
            if (err) { return next(err); }
            // Successful, so delete
            Item.findByIdAndRemove(req.body.itemID, (err) => {
                if (err) { return next(err); }
                if (req.body.filename !== '') {
                    fs.unlink(`public/images/${req.body.filename}`, (err) => {
                        if (err) console.log(err);
                        console.log('Image successfully deleted');
                    });
                }
                res.json({
                    message: 'Item deleted successfully!'
                });
            });
        })
}
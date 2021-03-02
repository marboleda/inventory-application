const { body, validationResult } = require('express-validator');
const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');

//Display details for a specific item
exports.item_detail = (req, res, next) => {

    Item.findById(req.params.id)
        .exec((err, item) => {
            if (err) { return next(err); }
            //Successful, so return details to client
            res.json(item);
        });
}
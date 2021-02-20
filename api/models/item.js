const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: {type: String, required: true, maxlength: 100},
        weight_num: {type: Number},
        weight_unit: {type: String, enum: ['kg','g','ml','l']},
        price: {type: Number},
        category: {type: Schema.Types.ObjectId, ref: 'Category'},
        stock: {type: Number},
        url: {type: String}
    }
);

module.exports = mongoose.model('Item', ItemSchema);
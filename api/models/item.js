const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: {type: String, required: true, maxlength: 100},
        weight_num: {type: Number},
        weight_unit: {type: String, enum: ['kg','g','ml','l', 'oz']},
        price: {type: Number},
        category: {type: Schema.Types.ObjectId, ref: 'Category'},
        stock: {type: Number},
    }
);

// Virtual for item's URL
ItemSchema
.virtual('url')
.get(() => {
    return '/item/' + this._id;
})

module.exports = mongoose.model('Item', ItemSchema);
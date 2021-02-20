const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String}
    }
);

// Virtual for category's URL
CategorySchema
.virtual('url')
.get(() => {
    return '/category/' + this._idl
})

module.exports = mongoose.model('Category', CategorySchema);
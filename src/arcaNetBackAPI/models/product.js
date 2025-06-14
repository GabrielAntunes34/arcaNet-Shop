const mongoose = require('mongoose');
const { Schema } = mongoose;

// Products have a many-to-many relation with category and the only
// entity to store images, and I think we're going to save it in a pulic folder

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true          // Removes blank spaces at begin and end of strings
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,      // Must be an URL
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    sold: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    highlighted: {
        type: Boolean,
        default: false
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true }); // createdAt e updatedAt automáticos

module.exports = mongoose.model('Product', productSchema);
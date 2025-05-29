const mongoose = require('mongoose');
const { Schema } = mongoose;

// Category have a many to many realtion with products
// But it will be easier to manage if we just create a list of 
// categories per product, and call's both of them for more
// complicated queries

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true     
    }
}, {timestamps: true})

module.exports = mongoose.model('Category', categorySchema);
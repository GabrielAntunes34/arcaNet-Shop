const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is inder a test... Still don't know if we're gonna use it

const discountCuponSchema = new Schema({
    code: {
        type: String,
        required: true,
        trim: true
    },
    discount: {
        type: Number,
        required: True,
    },
    validUntil: {
        type: Date,
        required: true,
    },
    usage: {
        type: Number,
        required: True,
        default: 0,
    },
    useBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

module.exports = mongoose.model('discountCupon', discountCuponSchema);
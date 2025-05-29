const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is inder a test... Still don't know if we're gonna use it

const cuponSchema = new Schema({
    code: {
        type: String,
        required: true,
        trim: true
    },
    discount: {
        type: Number,
        required: true,
        unique: true
    },
    usage: {
        type: Number,
        required: true,
        default: 0,
    },
    useBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

module.exports = mongoose.model('Cupon', cuponSchema);
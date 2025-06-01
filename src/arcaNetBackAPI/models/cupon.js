const mongoose = require('mongoose');
const { Schema } = mongoose;

// Cupons are used to give discount for specific users
// Each user has 1 unique cupon, and each cupon has 1 unique user
// At each day, They may expire and will only be used once.
// The user may not win a cupon in a certain day, therefore the
// cupon won't be valid

const cuponSchema = new Schema({
    discount: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true
    },
    valid: {
        type: Boolean,
        required: true,
        default: false
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Cupon', cuponSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

// This are the base attributes for our Entity User. Still
// need to create hooks for authentication, hash password and some
// minor validations

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: [
            'client',
            'admin'
        ],
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
}, { timestamps:true });

module.exports = mongoose.model('User', userSchema);
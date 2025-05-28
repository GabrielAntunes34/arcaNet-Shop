const jwt = require('jsonwebtoken');
require('dotenv').config();

// Set's a JWT new token based on our enviromental variables
const generateToken = (userId, role) => {
    const payload = {userId, role};
    const options = { expiresIn: process.env.JWT_EXPIRATION };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return token;
}

// If a JWT is recieved, this function, will verify if it's
// still valid
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch(error) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
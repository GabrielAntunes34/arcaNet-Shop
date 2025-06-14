const jwt = require('jsonwebtoken');
require('dotenv').config();

// Sets a jwt for a discount cupon based our .env variables
const generateCuponToken = (cuponId, discountValue, used) => {
    const payload = {cuponId, discountValue, used};
    const options = { expiresIn: '24h'};
    const token = jwt.sign(payload, process.env.JWT_CUPON_SECRET, options);

    return token;
}

// Sets a auth JWT new token based on our .env variables
const generateAuthToken = (userId, role) => {
    const payload = {userId, role};
    const options = { expiresIn: process.env.JWT_EXPIRATION };
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return token;
}

// If a JWT is recieved, this function, will verify if it's
// still valid
const verifyToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
        //const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch(error) {
        return null;
    }
}

module.exports = { 
    generateCuponToken,
    generateAuthToken,
    verifyToken 
};
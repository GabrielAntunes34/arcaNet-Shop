const jwt = require('jsonwebtoken');
const ErrorMessage = require('../util/ErrorMessage');
require('dotenv').config();

// Verifyes the passed's token vality and forwards it's info to the next middleware
// or controller
const authenticate = (req, res, next) => {
    const token = req.cookies.authToken;

    console.log(req.cookies);

    // Verifying if user has a token
    if(!req.cookies.authToken)
        return res.status(401).json({message:'Unauthorized', data:null, details:''});

    // Validating cookie and, then, proceeding to the next handler
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
        req.user = decodedData      
        next();
    }
    catch(err) {
        res.status(401).json({message:'Unauthorized', data:null, details:''});
    }
};

// Verifyies if an authenticated user has permission based on it's role
const authorize = (role) => {
    return (req, res, next) => {
        const tokenRole = req.user?.role;

        // Verifying if there really is a token
        if(!tokenRole) {
            return res.status(401).json({ message: 'Unauthorized', data:null, details:''});
        }

        // Verifying if user possesses the given role
        if(tokenRole === role || tokenRole === 'admin') {
            return next();
        }
        res.status(403).json({message:'Forbidden', data:null, details:''});
    }
}

module.exports = {
    authenticate,
    authorize
}
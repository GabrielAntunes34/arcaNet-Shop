const express = require('express');
const ErrorMessage = require('../util/ErrorMessage');

// Middleware to format and send error responses back to client
const errorMiddleware = (errorMessage, req, res, next) => {
    // Verifying if it's an user/server error
    if(!errorMessage)
        return next(); 

    // Sending the response at the defined data
    return res.status(errorMessage.status).json({
        message: errorMessage.message,
        detils: errorMessage.details,
        data: null
    });
}

module.exports = errorMiddleware;
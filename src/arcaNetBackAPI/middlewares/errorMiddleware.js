const express = require('express');
const ErrorMessage = require('../util/ErrorMessage');

// Middleware to format and send error responses back to client
const errorMiddleware = (errorMessage, req, res, next) => {
    // Verifying if it's an user/server error
    if(!errorMessage) {
        // Se não há errorMessage, retorna um erro genérico
        return res.status(500).json({
            message: 'Internal Server Error',
            details: 'An unexpected error occurred',
            data: null
        });
    }

    // Garantir que o status seja um número válido
    const status = errorMessage.status && typeof errorMessage.status === 'number' 
        ? errorMessage.status 
        : 500;

    // Sending the response at the defined data
    return res.status(status).json({
        message: errorMessage.message || 'Internal Server Error',
        details: errorMessage.details || '',
        data: null
    });
}

module.exports = errorMiddleware;
const express = require('express');
const Cupon = require('../models/cupon');
const { verifyToken } = require('../util/jwtUtils');
require('dotenv').config();

// Verifies if a logged user can play Wheel Of Fortune game
// If not, returns a message and the remaining wite time
const canPlayFortune = async (req, res, next) => {
    const userId = req.user.userId;

    try {
        // Verifying if the user never played before
        const cupon = await Cupon.findOne({userId: userId});
        if(!cupon)
            return next();

        // Verifying if the previous cupon expired
        const now = new Date();
        if(cupon.expiresAt < now)
            return next();

        // Calculating the remaining time for the next paly
        const waitTimeMs = cupon.expiresAt - now;
        const hours = Math.floor(waitTimeMs / (1000 * 60 * 60));
        const min = Math.floor((waitTimeMs % (1000 * 60 * 60)) / (1000 * 60));

        res.status(403).json({
            message: 'You\'re out of chances to day, go back in the future',
            data: [0, 0, 0],
            details: ''
        });

    }
    catch(err) {
        res.status(500).json({message:'Eror', data:null, datils:err.message});
    }
};

// Verifies it the user dosen't already have a cupon token
// In order to generate it in the future
const userWihoutCupon = (req, res, next) => {
    const token = req.cookies.cuponToken;

    if(!token)
        return next();

    res.status(403).json({
        message: 'You\'ve already recieved you\'re cupon!',
        data: null,
        details: ''
    });
};

module.exports = { 
    canPlayFortune,
    userWihoutCupon
};
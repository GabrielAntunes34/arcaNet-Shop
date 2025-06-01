const Cupon = require('../models/cupon');
const { generateCuponToken } = require('../util/jwtUtils');
const ErrorMessage = require('../util/ErrorMessage');
require('dotenv').config();


// Setting a cookie for our cupon jwt
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,    // duration of one day
    sameSite: 'strict'
}

// Auxiliar function to encapsulate random card's choice logic
const getRandomCards = () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const cards = Array(3).fill().map(() => {
        return values[Math.floor(Math.random() * values.length)];
    });

    return cards;
}

// Get three random card values, sends to the interface and
// if thei're equal, atualizes the user's cupon at the database
const draw_fortune = async (req, res, next) => {
    const userId = req.user.userId;
    const cards = getRandomCards();
    let discountValue = 0;

    // Discoverying if the user has won the game
    const validCard = cards.every(v => v === cards[0]);
    if(validCard)
        discountValue = cards[0] * 5;

    try {
        const currDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Finding to alter or create a new cupon
        const updatedCupon = await Cupon.findOneAndUpdate(
            {userId: userId},       
            {
                discount: discountValue,
                expiresAt: currDate,
                valid: validCard,
                used: false,
                userId: userId
            },
            {upsert:true, new: true}
        );

        // Returning the cards that need to be shown in the interface
        res.json({message: 'Success', data: cards, details: null});
    }
    catch(err) {
        const errMess = new ErrorMessage('Cupon', -1, 500, err.message);
        return next(errMess);
    }
};

// Generates a token for the user who claimed it's cupon
const claim_cupon = async (req, res, next) => {
    const userId = req.user.userId;

    try {
        // Getting the users cupon
        const cupon = await Cupon.findOne({userId: userId});
        if(!cupon) {
            throw new Error('User or cupon non-existent');
        }

        // Checking it the cupon is valid
        if(!cupon.valid) {
            return res.status(403).json({
                message: 'You didn\'t won a cupon this time. Try again later',
                data: null,
                details: ''
            }) 
        }

        // Instanciating a cookie to activate the discount
        const token = generateCuponToken(cupon._id, cupon.discount, cupon.used);
        res.cookie('cuponToken', token, COOKIE_OPTIONS);
        res.json({message:'Success', data:null, details:''});

    }
    catch(err) {
        const errMess = new ErrorMessage('Cupon', -1, 500, err.message);
        return next(errMess); 
    }
};

module.exports = {
    draw_fortune,
    claim_cupon
}
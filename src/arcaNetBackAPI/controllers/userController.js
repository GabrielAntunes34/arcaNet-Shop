const User = require('../models/User');
const ErrorMessage = require('../util/ErrorMessage');

// Returns all users from data base
const read_user = async (req, res, next) => {
    try {
        const allUsers = await User.find().sort({ createdAt: -1 });
        res.json({ message:'Success', data:allUsers, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', -1, 500, err.message);
        return next(errMess);
    }
};

// Return a specific user register from data base by it's id
const read_user_id = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({_id: id});

        // Verifying if there is such a register
        if(!user) {
            const errMess = new ErrorMessage('User', id, 404);
            return next(errMess);
        }

        // Sending the correct data
        res.json({ message:'Success', data:user, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', id, 500, err.message);
        return next(errMess);
    }
};

// Creates a new user at the database from the data passed at the requisition's body
const create_user = async (req, res, next) => {
    const userData = req.body;

    try {
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', -1, 400, err.message);
        return next(errMess);
    }
};

// Updates an existing user expreesed at the url's path with the new data
// at the requisition's body
const update_user = async (req, res, next) => {
    const id = req.params.id;
    const userData = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({_id: id}, userData, {new: true, runValidators: true});

        // Verifying if the given user exists
        if(!updatedUser) {
            const errMess = new ErrorMessage('User', id, 404);
            return next(errMess);
        }

        res.status(200).json({ message:'Success', data:updatedUser, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', id, 400, err.message);
        return next(errMess);
    }
};

// Deletes from database the user expressed by it's id at the request
const delete_user = async (req, res, next) => {
    const id = req.params.id;

    try{
        const deletedUser = await User.findOneAndDelete({_id: id});

        // Verifying if the given user
        if(!deletedUser) {
            const errMess = new ErrorMessage('User', id, 404);
            return next(errMess);
        }

        res.json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', id, 500, err.message);
        return next(errMess);
    }
};

module.exports = {
    read_user,
    read_user_id,
    create_user,
    update_user,
    delete_user
};
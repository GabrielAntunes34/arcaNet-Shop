const User = require('../models/user');
const Cupon = require('../models/cupon');
const ErrorMessage = require('../util/ErrorMessage');
const bcrypt = require('bcryptjs');
require('dotenv').config();

//================================
// CRUD CONTROLLERS
//================================

// Returns all users from data base
const read_user = async (req, res, next) => {
    try {
        // Selecting all users without it's password
        console.log("AAAAAAAAAAAAAAAH");
        const allUsers = await User.find({}, { password:0 }).sort({ createdAt: -1 });

        console.log(allUsers);

        res.json({ message:'Success', data:allUsers, details:'' });
    }
    catch(err) {
        console.log(err.message);
        const errMess = new ErrorMessage('User', -1, 500, err.message);
        return next(errMess);
    }
};

// Return a specific user register from data base by it's id
const read_user_id = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({_id: id}, { password:0 });

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
    console.log("body:   ", req.body);
    const {
        name,
        email,
        address,
        phone,
        password
    } = req.body;

    try {
        // Hashing password before saving
        const saltGen = parseInt(process.env.PASS_SALT, 10);
        const salt = await bcrypt.genSalt(saltGen);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Constructing and saving the new user
        const newUser = new User({
            name,
            email,
            address,
            phone,
            role: 'client', // Default role
            password: hashedPassword
        });

        console.log(newUser);
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
        // Se for admin e está tentando virar client, checar se é o último admin
        const user = await User.findOne({_id: id});
        if (user.role === 'admin' && userData.role === 'client') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount === 1) {
                return res.status(400).json({ message: 'Cannot change the last admin to client.', data: null, details: '' });
            }
        }

        const updatedUser = await User.findOneAndUpdate({_id: id}, userData, {new: true, runValidators: true});

        // Verifying if the given user exists
        if(!updatedUser) {
            const errMess = new ErrorMessage('User', id, 404);
            return next(errMess);
        }

        // Deleting password and sending the new data at the response
        resUser = updatedUser.toObject();
        delete resUser.password;
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
        // Checar se está tentando deletar o último admin
        const user = await User.findOne({_id: id});
        if (user.role === 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount === 1) {
                return res.status(400).json({ message: 'Cannot delete the last admin.', data: null, details: '' });
            }
        }

        const deletedUser = await User.findOneAndDelete({_id: id});

        // Verifying if the given user exists
        if(!deletedUser) {
            const errMess = new ErrorMessage('User', id, 404);
            return next(errMess);
        }

        // Deleting the cupon that references him (if he has one)
        const userCupon = await Cupon.findOneAndDelete({userId: id});

        res.json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', id, 500, err.message);
        return next(errMess);
    }
};


//================================
// PROFILE PAGE ACTIONS
//================================

// Gets the current logged user by the id on it's token
// This is the route for the client access it's own profile
const read_own_user = async (req, res, next) => {
    // Retrieving from the token (authMiddleware is guaranteeing this syntax)
    const id = req.user.userId;
  
    try {
        const myUser = await User.findOne({ _id: id }, { password:0 });

        // Checking if the user exists
        if(!myUser) {
            const errMess = new ErrorMessage('User', id, 404);
            return next(errMess);
        }

        res.status(200).json({ message:'Success', data: myUser, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', id, 500);
        next(errMess);
    }
};

// Gets the current logged user by the id on it's token
// This is the route for the client access it's own profile
const update_own_user = async (req, res, next) => {
    const id = req.user.userId;
    const {name, address, phone} = req.body;
    
    try {
        // the client user can only update it's name, address
        // or phone number
        // Treat '$' as empty string for address and phone
        const updateData = {
            name,
            address: address === '$' ? '' : (address || ''),
            phone: phone === '$' ? '' : (phone || '')
        };
        
        const updatedUser = await User.findOneAndUpdate(
            {_id: id},
            updateData,
            {new: true, runValidators: true});

        // Verifying if the given user exists
        if(!updatedUser) {
            const errMess = new ErrorMessage('User', id, 404);
            return next(errMess);
        }

        // Deleting password and sending the new data at the response
        resUser = updatedUser.toObject();
        delete resUser.password;
        res.status(200).json({ message:'Success', data:updatedUser, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('User', id, 500, err.message);
        next(errMess);
    }
}


// Delets the current logged user by the id on it's token
// This is the route for the client delete his own account
const delete_own_user = async (req, res, next) => {
    const id = req.user.userId;

    try {
        const deletedUser = await User.findOneAndDelete({ _id:id });

        // Verifying if the searched user exists
        if(!deletedUser) {
            const errMess = new ErrorMessage('User', id, 404);
            next(errMess);
        }

        res.status(200).json({message:'Success', data:null, details:''});
    }
    catch(err) {
        const errMess = new ErrorMessage('User', id, 500, err.message);
        next(errMess);
    }
};

module.exports = {
    read_user,
    read_user_id,
    create_user,
    update_user,
    delete_user,
    read_own_user,
    update_own_user,
    delete_own_user
};
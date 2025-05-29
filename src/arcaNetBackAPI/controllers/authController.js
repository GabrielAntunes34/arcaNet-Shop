const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../util/jwtUtils');

require('dotenv').config();

// This controller implements functions to resolver login and
// register operations
// We don't use ErrorMessages here, to control exactly what info will leak
// Otherwise, we could run into an user enumeration vulnerability

// Setting a cookie for our jwt
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
    sameSite: 'strict'
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Verifying if user already exists
        const user = await User.findOne({email});
        if(!user) {
            throw Error('Invalid credentials');
        }

        // Comparing the passwords, if the user exists
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error('Invalid credentials');
        }

        // If data match, we generate and return a new token and prepare user to be sent
        const token = generateToken(user._id, user.role);
        const resUser = user.toObject();
        delete resUser.password;

        // Putting everything in a cookie and sending
        res.cookie('authToken', token, COOKIE_OPTIONS);
        res.json({message:'Success', data:resUser, details:''});
    }
    catch(err) {
        if(err.message === 'Invalid credentials')
            return res.status(404).json({message:err.message, data:null, details:''});
        res.status(500).json({message:'Server error at Auth', data: null, details:err.message});
    }
};

// Creates a new client user at the data base. Front-end should redirect it to 
// login later.
const register = async (req, res) => {
    const {
        name,
        email,
        address,
        phone,
        password
    } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists',
            data: null,
            details: ''
        });
    }

    // Hashing password before saving
    const saltGen = parseInt(process.env.PASS_SALT, 10);
    const salt = await bcrypt.genSalt(saltGen);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);


    // Instanciating a new user with the given data
    const newUser = new User({
        name,
        email,
        address,
        phone,
        role: 'client',
        password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered', data: null, details:null });
  } catch (err) {
    res.status(500).json({ message: 'Server error', data:null, details:err.message });
  }
};

const logout = (req, res) => {
    // Checking it client's logged, then deleting it's cookie and returning
    if(req.cookies['authToken']) {
        res.clearCookie('authToken');
        res.status(204).json({message:'Success', data:null, details:''});
    }

    res.status(400).json({message:'No auth state to be deleted', data:null, details:''});
}

module.exports = {
    login,
    register,
    logout
}
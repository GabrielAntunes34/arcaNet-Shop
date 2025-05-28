const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../util/jwtUtils');
const ErrorMessage = require('../util/ErrorMessage');

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
        const user = await User.find({email});
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
        const { password, resUser } = user.toObject();

        // Putting everything in a cookie and sending
        res.cookie('authToken', token, COOKIE_OPTIONS);
        res.json({message:'Success', data:resUser, details:''});
    }
    catch(err) {
        if(err.message === 'Invalid credentials')
            return res.status(404).json({message:err.message, data:null, details:''});
        res.status(500).json({message:'Server error at Auth', data: null, details:''});
    }
};

// Creates a new client user at the data base. Front-end should redirect it to 
// login later.
const register = async (req, res) => {
router.post('/register', async (req, res) => {
    const {
        name,
        email,
        address,
        phone,
        password
    } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) 
        return res.status(400).json({
            message: 'User already exists',
            data: null,
            details: ''
        });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

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
  } catch (error) {
    res.status(500).json({ message: 'Server error', data:null, details:err });
  }
});
};


module.exports = {
    login,
    register
}
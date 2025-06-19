const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');

//================================
// SETTING UP THE SERVER
//================================

// Importing API routes
const categoryRouter = require('./routes/categoryRouter');
const fortuneRouter = require('./routes/fortuneRouter');
const paymentRouter = require('./routes/paymentRouter');
const productRouter = require('./routes/productRouter');
const cuponRouter = require('./routes/cuponRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const { constants } = require('os');

// Enviroment configs
require('dotenv').config();
PORT = process.env.PORT;
DB_URI = process.env.DB_URI;


// Putting the server to listen
const app = express();
mongoose.connect(DB_URI)
    .then(() => {
        console.log('DB successfully connected');
        app.listen(PORT, () => {
            console.log(`API already linstening at port ${PORT}`);
        });
    })
    .catch(err => { 
        console.log('!-- ERROR --!');
        console.log('Couldn\'t connect do data base.');
        console.log(err);
    });

//================================
// MIDDLEWARES
//================================

// 
app.use(cors({
  origin: ['http://localhost:5173'], // *não* use '*'
  credentials: true,                   // permite envio de cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Adds URL encoding parsing
app.use(express.urlencoded({ extended:true }));

// Adds JSON for HTTP body data
app.use(express.json());

// Serves static archives from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Parser to simplfy cookie handling
app.use(cookieParser());

// Simple logger at the terminal for debug
app.use((req, res, next) => {
    console.log('--- NEW REQ ---');
    console.log('Method: ', req.method);
    console.log('path: ', req.url);
    console.log('user:', req.host);
    console.log('');

    // Calling the next middleware
    next();
});

//================================
// ROUTES                         
//================================

// Business routes
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);
app.use('/fortune', fortuneRouter);

// Admin CRUD routes
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/cupon', cuponRouter);
app.use('/category', categoryRouter);

// errorMiddleware in the case of wrong responses
app.use(errorMiddleware);

// Default response for non-specifies routes
app.use((req, res) => {
    res.status(404).json({ 
        message:'Requested resource inexistent', 
        details:`No path sucth as ${req.url}`,
        data: null
    });
});
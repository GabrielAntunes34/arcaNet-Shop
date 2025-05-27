const express = require('express');
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/errorMiddleware');

//================================
// SETTING UP THE SERVER
//================================

// Importing API routes
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter');

// Enviroment configs
require('dotenv').config();
PORT = process.env.PORT;
DB_URI = process.env.DB_URI;


// Putting the server to listen
const app = express();
mongoose.connect(DB_URI)
    .then(console.log('DB successfully connected'))
    .then(app.listen(PORT))
    .catch(err => { 
        console.log('!-- ERROR --!');
        console.log('Couldn\'t connect do data base.');
        console.log(err);
    });

//================================
// MIDDLEWARES
//================================

// Adds URL encoding parsing
app.use(express.urlencoded({ extended:true }));

// Adds JSON for HTTP body data
app.use(express.json());

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

app.use('/product', productRouter);
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
})
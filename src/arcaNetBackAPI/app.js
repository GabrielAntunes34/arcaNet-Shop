const path = require('path');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errorMiddleware');

// Mock to populate our database
const { generateData } = require('./mockData/seed');

//================================
// SERVER CONFIGURATION
//================================

// API route imports
const categoryRouter = require('./routes/categoryRouter');
const fortuneRouter = require('./routes/fortuneRouter');
const paymentRouter = require('./routes/paymentRouter');
const productRouter = require('./routes/productRouter');
const cuponRouter = require('./routes/cuponRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const { constants } = require('os');

// Environment variables
require('dotenv').config();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

// Create and start the server
const app = express();
mongoose
  .connect(DB_URI)
  .then(async () => {
    console.log('Database connection established');
    app.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });

    await generateData();
  })
  .catch((err) => {
    console.log('!-- ERROR --!');
    console.log("Couldn't connect to the database.");
    console.log(err);
  });

//================================
// GLOBAL MIDDLEWARES
//================================

// CORS setup
app.use(
  cors({
    origin: ['http://localhost:5173'], // do *not* use '*'
    credentials: true,                // allows cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cookie parser
app.use(cookieParser());

// Simple console logger for debugging
app.use((req, res, next) => {
  console.log('--- NEW REQUEST ---');
  console.log('Method:', req.method);
  console.log('Path:  ', req.url);
  console.log('Host:  ', req.host);
  console.log('');
  next();
});

//================================
// ROUTES
//================================

// Auth and business logic routes
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);
app.use('/fortune', fortuneRouter);

// Admin CRUD routes
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/cupon', cuponRouter);
app.use('/category', categoryRouter);

// Global error handler
app.use(errorMiddleware);

// Fallback for unspecified routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Requested resource does not exist',
    details: `No path such as ${req.url}`,
    data: null,
  });
});

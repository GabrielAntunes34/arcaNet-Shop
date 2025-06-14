const multer = require('multer');
const path = require('path');

// Middleware to parse images coming from a multipart field in
// a requrest

// Configuring multer to read ans save product's images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));  // Folder that stores images
  },
  filename: (req, file, cb) => {
    // To make filenames unique, we'll use their filestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Middleware to upload files
const upload = multer({ storage: storage });

module.exports = {
    upload
};
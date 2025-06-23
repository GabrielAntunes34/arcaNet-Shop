const Product = require('../models/product');
const ErrorMessage = require('../util/ErrorMessage');
const multer = require('multer');
const path = require('path');


// Returns all products from data base
const read_product = async (req, res, next) => {
    const { withCategories } = req.query; // if has ?withCategories=true

    try {
        let allProdsQuery = Product.find().sort({ createdAt: -1});

        // Appending it's category data, if necessary
        if(withCategories)
            allProdsQuery = allProdsQuery.populate('categories');

        // Awaiting and returning all products
        const allProds = await allProdsQuery;
        //console.log(allProds);
        res.json({ message:'Success', data:allProds, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Product', -1, 500, err.message);
        return next(errMess);
    }
};

// Return a specific product register from data base by it's id
const read_product_id = async (req, res, next) => {
    const { withCategories } = req.query; // if has ?withCategories=true
    const id = req.params.id;

    try {
        let prodQuery = Product.findOne({_id: id});

        // Verifying if we need to append product's categories
        if(withCategories)
            prodQuery = prodQuery.populate('categories');
        prod = await prodQuery;

        // Verifying if there is such a register
        if(!prod) {
            const errMess = new ErrorMessage('Product', id, 404);
            return next(errMess);
        }

        // Sending the correct data
        res.json({ message:'Success', data:prod, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Product', id, 500, err.message);
        return next(errMess);
    }
};

// Creates a new product at the database from the data passed at the requisition's body
const create_product = async (req, res, next) => {
    const {name, description, price, stock, sold, highlighted, categories, photo} = req.body;

    //console.log(req.body);

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    //console.log('Image URL:', imageUrl);
    try {
        const newProd = new Product({
            name: name,
            description: description,
            image: imageUrl,
            price: price,
            stock: stock,
            sold: sold,
            highlighted: highlighted,
            categories: categories
        });

        console.log('New Product:', newProd);
        await newProd.save();
        res.status(201).json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Product', -1, 400, err.message);
        return next(errMess);
    }
};

// Updates an existing product expreesed at the url's path with the new data
// at the requisition's body
const update_product = async (req, res, next) => {
    const id = req.params.id;

    try {
        const updatedProd = await Product.findOneAndUpdate({_id: id}, req.body, {new: true, runValidators: true});

        // Verifying if the given product exists
        if(!updatedProd) {
            const errMess = new ErrorMessage('Product', id, 404);
            return next(errMess);
        }

        res.status(200).json({ message:'Success', data:updatedProd, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Product', id, 400, err.message);
        return next(errMess);
    }
};

// Deletes from database the product expressed by it's id at the request
const delete_product = async (req, res, next) => {
    const id = req.params.id;

    try{
        const deletedProd = await Product.findOneAndDelete({_id: id});

        // Verifying if the given product
        if(!deletedProd) {
            const errMess = new ErrorMessage('Product', id, 404);
            return next(errMess);
        }

        res.json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Product', id, 500, err.message);
        return next(errMess);
    }
};

module.exports = {
    read_product,
    read_product_id,
    create_product,
    update_product,
    delete_product
};


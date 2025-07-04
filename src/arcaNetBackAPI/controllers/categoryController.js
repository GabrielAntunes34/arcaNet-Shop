const mongoose = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');
const ErrorMessage = require('../util/ErrorMessage');

// Returns all categories from data base
const read_category = async (req, res, next) => {
    try {
        const allCats = await Category.find().sort({ createdAt: -1 });
        res.json({ message:'Success', data:allCats, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Category', -1, 500, err.message);
        return next(errMess);
    }
};

// Return a specific category register from data base by it's id
const read_category_id = async (req, res, next) => {
    const id = req.params.id;

    try {
        const cat = await Category.findOne({_id: id});

        // Verifying if there is such a register
        if(!cat) {
            const errMess = new ErrorMessage('Category', id, 404);
            return next(errMess);
        }

        // Sending the correct data
        res.json({ message:'Success', data:cat, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Category', id, 500, err.message);
        return next(errMess);
    }
};

// Creates a new category at the database from the data passed at the requisition's body
const create_category = async (req, res, next) => {
    const { name } = req.body;

    try {
        const newCat = new Category({name});
        await newCat.save();
        res.status(201).json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Category', -1, 400, err.message);
        return next(errMess);
    }
};

// Updates an existing category expreesed at the url's path with the new data
// at the requisition's body
const update_category = async (req, res, next) => {
    const id = req.params.id;
    const updateData = req.body; // recebe tudo que vier no body

    try {
        const updatedCat = await Category.findOneAndUpdate({_id: id}, updateData, {new: true, runValidators: true});

        if(!updatedCat) {
            const errMess = new ErrorMessage('Category', id, 404);
            return next(errMess);
        }

        res.status(200).json({ message:'Success', data:updatedCat, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Category', id, 400, err.message);
        return next(errMess);
    }
};


// Deletes from database the category expressed by it's id at the request
// This also removes all it's references from the product's that have them
const delete_category = async (req, res, next) => {
    const id = req.params.id;
    
    try{
        const deletedCat = await Category.findOneAndDelete({_id: id});

        // Verifying if the given category
        if(!deletedCat) {
            const errMess = new ErrorMessage('Category', id, 404);
            return next(errMess);
        }

        // Removing all references of this category in Products
        // with a bulk update (for better performance)
        await Product.updateMany(
            {categories: id},
            { $pull: {categories: id}}
        );

        const prods = await Product.find({ categories:id })
        await Product.updateMany(
        { categories: id },
        { $pull: { categories: id } },
        );

        res.json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Category', id, 500, err.message);
        return next(errMess);
    }
};

module.exports = {
    read_category,
    read_category_id,
    create_category,
    update_category,
    delete_category
};


const Cupon = require('../models/cupon');
const ErrorMessage = require('../util/ErrorMessage');

// Returns all cupons from data base
const read_cupon = async (req, res, next) => {
    try {
        const allCupons = await Cupon.find().sort({ createdAt: -1 });
        res.json({ message:'Success', data:allCupons, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Cupon', -1, 500, err.message);
        return next(errMess);
    }
};

// Return a specific cupon register from data base by it's id
const read_cupon_id = async (req, res, next) => {
    const id = req.params.id;

    try {
        const cupon = await Cupon.findOne({_id: id});

        // Verifying if there is such a register
        if(!cupon) {
            const errMess = new ErrorMessage('Cupon', id, 404);
            return next(errMess);
        }

        // Sending the correct data
        res.json({ message:'Success', data:cupon, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Cupon', id, 500, err.message);
        return next(errMess);
    }
};

// Creates a new cupon at the database from the data passed at the requisition's body
const create_cupon = async (req, res, next) => {
    const cuponData = req.body;

    try {
        const newCupon = new Cupon(cuponData);
        await newCupon.save();
        res.status(201).json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Cupon', -1, 400, err.message);
        return next(errMess);
    }
};

// Updates an existing cupon expreesed at the url's path with the new data
// at the requisition's body
const update_cupon = async (req, res, next) => {
    const id = req.params.id;

    try {
        const updatedCupon = await Cupon.findOneAndUpdate({_id: id}, req.body, {new: true, runValidators: true});

        // Verifying if the given cupon exists
        if(!updatedCupon) {
            const errMess = new ErrorMessage('Cupon', id, 404);
            return next(errMess);
        }

        res.status(200).json({ message:'Success', data:updatedCupon, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Cupon', id, 400, err.message);
        return next(errMess);
    }
};

// Deletes from database the cupon expressed by it's id at the request
const delete_cupon = async (req, res, next) => {
    const id = req.params.id;

    try{
        const deletedCupon = await Cupon.findOneAndDelete({_id: id});

        // Verifying if the given cupon
        if(!deletedCupon) {
            const errMess = new ErrorMessage('Cupon', id, 404);
            return next(errMess);
        }

        res.json({ message:'Success', data:null, details:'' });
    }
    catch(err) {
        const errMess = new ErrorMessage('Cupon', id, 500, err.message);
        return next(errMess);
    }
};

module.exports = {
    read_cupon,
    read_cupon_id,
    create_cupon,
    update_cupon,
    delete_cupon
};

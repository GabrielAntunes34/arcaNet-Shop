const Product = require('../models/product');
const ErrorMessage = require('../util/ErrorMessage');



// Makes all the necessary alterations into the database for a payment operation
const post_payment = async (req, res, next) => {
    const cartItems = req.body;

    try {
        // Iterating through all products at the item list
        for(let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            
            // Getting current stock and sold from product
            const prod = await Product.findOne(
                // para testar sem os products implementados ainda, utilize {id:item.id}
                {_id: item._id},         // select filter
                { stock:1, sold:1 }     // projection
            );
        
            // If a non-existing product were specified, we'll jump to the next in
            // the list
            if(!prod) {
                continue;
            }

            // Calculating the new quantities for the product
            const newStock = prod.stock - item.quantityToAdd;
            const newSold = prod.sold + item.quantityToAdd;

            // Payment won't finish if user somehow tried to buy 
            // more than a product has in store's stock.
            if(newStock < 0) {
                const errMess = ErrorMessage('Payment', -1, 401);
                return next(errMess);
            }
  
            // Ading the quantity to sold, while removing it from stock
            const test = await Product.findOneAndUpdate(
                
                {_id:item._id},
                {sold: newSold, stock: newStock},
                {new: true, runValidators: true} 
            );
        }

        res.json({message: 'Success', data:null, details: ''});
    }
    catch(err) {
        const errorMess = ErrorMessage('Payment', -1, 500, err.message);
        next(errorMess);
    }
};

module.exports = { post_payment };
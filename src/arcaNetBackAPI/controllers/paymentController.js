const Product = require('../models/product');
const ErrorMessage = require('../util/ErrorMessage');

/*
SUPOSIÇÕES EXTREMAMENTE IMPORTANTES DO GABIRUUU
- O frontend tornará impossível ter quantityToAdd > stock

- a página de carrinho vai mandar o seguint objeto:
[
    {
        id,                 --> product._id
        quantityToAdd
    }
]

Acho que faz mais sentido, pois passamos a ter menos dados sendo passados por rede
Especialmente porque já queremos evitar coisas como "passar imagens"

updates, que eu preciso dar:
sold + quantityToAdd
stock - quantityToAdd
*/

// Makes all the necessary alterations into the database for a payment operation
const post_payment = async (req, res, next) => {
    const cartItems = req.body;

    try {
        // Iterating through all products at the item list
        for(let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            
            // Getting current stock and sold from product
            const prod = await Product.findOne(
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
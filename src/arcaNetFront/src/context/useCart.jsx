import { useContext } from 'react';
import { CartContext } from './CartContext.jsx';

export const useCart = () => {

    // useContext is a React hook that allows you to access the context
// The CartContext is the context we created to manage the cart
    const context = useContext(CartContext); 
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
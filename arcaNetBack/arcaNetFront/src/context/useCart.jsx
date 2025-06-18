import { useContext } from 'react';
import { CartContext } from './CartContext.jsx';

export const useCart = () => {

    // useContext é um hook do React que permite acessar o contexto
    // O CartContext é o contexto que criamos para gerenciar o carrinho
    const context = useContext(CartContext); 
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
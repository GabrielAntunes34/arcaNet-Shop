// src/context/CartContext.jsx (ou .js, ajuste o nome do arquivo conforme o seu)
import React, { createContext, useState, useContext } from 'react'; // useContext é usado no useCart

// 1. CRIAR O CONTEXTO
// ESTA LINHA É CRUCIAL E O 'CartContext' PRECISA SER EXPORTADO
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); 

    const addToCart = (product, quantityToAdd) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        let updatedItems = [...prevItems];

        if (existingItem) {
            // Se o item já existe, verifica se a quantidade total não excede o estoque
            if (existingItem.quantity + quantityToAdd > product.stock) {
                alert("Quantidade excede o estoque!");
                return prevItems;
            }

            // Atualiza a quantidade se já existe no carrinho
            return prevItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantityToAdd }
                    : item
            );
        } else {
            updatedItems = [...prevItems, { ...product, quantity: quantityToAdd }];
        }

        //console.log("Carrinho dentro do setState:", updatedItems);
        // Adiciona novo item 
        return updatedItems;
    });

    //console.log("Carrinho dentro do setState:", updatedItems);

    console.log(`${quantityToAdd} x "${product.name}" added/updated in cart.`);
    };

    const removeFromCart = (productId) => { // Adicionei as suas outras funções aqui
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        // Use o CartContext.Provider que foi criado e exportado acima
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// SEU HOOK PERSONALIZADO useCart (pode ficar neste arquivo ou em um separado)
// Se estiver em um arquivo separado, ele importaria CartContext deste arquivo.
// Se estiver neste arquivo, ele já tem acesso direto a CartContext.
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
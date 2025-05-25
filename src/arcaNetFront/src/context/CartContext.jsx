import React, { createContext, useState } from 'react';


const mockCartItems = [
    {
        id: 'prod_test_001',
        name: 'Produto de Teste 1',
        price: 25.50,
        quantity: 2,
        image: 'https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2022/05/14/1578708983-shutterstock1361240465.jpg'
    },
    {
        id: 'prod_test_002',
        name: 'Super Item de Teste 2',
        price: 79.99,
        quantity: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxXuU4O0RxEWuKDVx34Si9rp9l5wbywUw5tQ&s'
    }
];



// exportando o contexto para que o useCart possa acessá-lo
export const CartContext = createContext();



export const CartProvider = ({ children }) => {

    // É o array que irá armazenar os itens do carrinho
    const [cartItems, setCartItems] = useState([mockCartItems[0], mockCartItems[1]]); // Inicializa o carrinho como um array vazio  
    
    
    
    // Função para adicionar item ao carrinho
    const addToCart = (product) => {
        setCartItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id);
          if (existingItem) {
            // Se existir, atualiza a quantidade (exemplo)
            return prevItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }   
          // Se não existir, adiciona com quantidade 1
          return [...prevItems, { ...product, quantity: 1 }];
        });
    };  


    // Função para remover item do carrinho
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };  


    // Função para atualizar quantidade de um item
    const updateQuantity = (productId, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: quantity } : item
            ).filter(item => item.quantity > 0) // Remove se a quantidade for 0
        );
    };  


    // Função para limpar o carrinho
    const clearCart = () => {
        setCartItems([]);
    };  


    return (
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
        {children}
      </CartContext.Provider>
    );
};
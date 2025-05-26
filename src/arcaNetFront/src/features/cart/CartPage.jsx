import React from 'react';
import './CartPage.css';
import CartItem from './CartItem/CartItem';
import { useCart } from '../../context/useCart.jsx';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {  
    
    // Use o hook useCart para acessar o estado e as funções do carrinho
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

    // Se não houver itens, exibe a mensagem de carrinho vazio
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className='cart-page'>
                <div className='cart-header'>
                    <h1>Shopping Cart</h1>
                    <p>Your cart is currently empty.</p>
                </div>
            </div>
        );
    }

    // Calcula o total de itens e o preço total a partir de cartItems
    const totalItens = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const precoTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);


    // Funções para passar ao CartItem, que chamarão as funções do contexto
    const handleIncreaseQuantity = (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            updateQuantity(itemId, item.quantity + 1);
        }
    };
    const handleDecreaseQuantity = (itemId) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item && item.quantity > 1) {
            updateQuantity(itemId, item.quantity - 1);
        } else if (item && item.quantity === 1) {
            updateQuantity(itemId, item.quantity - 1);
        }
    };
    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };


    // Função para navegar para a página de pagamento
    const navigate = useNavigate();
    const handleGoToPayment = () => {
        navigate('/payment');
    }

    return (
        <div className='cart-page'>
            <div className='cart-header'>
                <h1>Shopping Cart</h1>
                <p>You have {totalItens} item(s) in your cart.</p>
            </div>

            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem
                        image={item.image || '#'}
                        title={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onIncrease={() => handleIncreaseQuantity(item.id)}
                        onDecrease={() => handleDecreaseQuantity(item.id)}
                        onRemove={() => handleRemoveItem(item.id)}
                    />
                ))}
            </div>

            <div className="cart-summary">
                <h2>Cart Summary</h2>
                <p><span>Total Items:</span> <span>{totalItens}</span></p>
                <p><span>Total Price:</span> <span> $ {precoTotal.toFixed(2)}</span></p>

                <div className="cart-actions">
                    <div className='payment-button'>
                        <Button onClick={handleGoToPayment}> Go to Payment </Button>
                    </div>
                
                    {cartItems.length > 0 && (
                        <div className="cart-delete">
                            <Button onClick={clearCart} variant="danger">
                                Delete Items
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
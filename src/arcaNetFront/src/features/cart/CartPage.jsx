import React from 'react';
import './CartPage.css';
import CartItem from './CartItem/CartItem';
import { useCart } from '../../context/useCart.jsx';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  // Access cart state and actions via the useCart hook
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  // If no items, show an empty cart message
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>Your cart is currently empty.</p>
        </div>
      </div>
    );
  }

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handlers to modify quantities or remove items
  const handleIncreaseQuantity = (itemId) => {
    const item = cartItems.find((i) => i._id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cartItems.find((i) => i._id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      // Remove item when quantity reaches 0
      removeFromCart(itemId);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Navigate to the payment page
  const navigate = useNavigate();
  const handleGoToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>You have {totalItems} item(s) in your cart.</p>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item._id}
            image={item.image || '#'}
            title={item.name}
            price={item.price}
            quantity={item.quantity}
            stock={item.stock}
            onIncrease={() => handleIncreaseQuantity(item._id)}
            onDecrease={() => handleDecreaseQuantity(item._id)}
            onRemove={() => handleRemoveItem(item._id)}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>
          <span>Total Items:</span> <span>{totalItems}</span>
        </p>
        <p>
          <span>Total Price:</span>{' '}
          <span>$ {totalPrice.toFixed(2)}</span>
        </p>

        <div className="cart-actions">
          <div className="payment-button">
            <Button variant="primary" onClick={handleGoToPayment}>
              Go to Payment
            </Button>
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

import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [lastAlertTime, setLastAlertTime] = useState(0);

  // Debounced alert to avoid duplicate pop-ups
  const showAlert = (message) => {
    const now = Date.now();
    // Prevents duplicate alerts within a 1-second interval
    if (now - lastAlertTime > 1000) {
      setLastAlertTime(now);
      alert(message);
    }
  };

  const addToCart = (product, quantityToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      // Handle cases where stock could be undefined or null
      const productStock =
        product.stock !== undefined && product.stock !== null
          ? Number(product.stock)
          : 0;

      if (existingItem) {
        // If the item already exists, ensure the total quantity does not exceed stock
        if (existingItem.quantity + quantityToAdd > productStock) {
          showAlert(
            `Cannot add more items. Only ${productStock} available in stock.`,
          );
          return prevItems;
        }

        // Update quantity if item is already in the cart
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      } else {
        // For new items, check the requested quantity against stock
        if (productStock > 0 && quantityToAdd > productStock) {
          showAlert(
            `Cannot add ${quantityToAdd} items. Only ${productStock} available in stock.`,
          );
          return prevItems;
        }
        // Add new item with the specified quantity
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });

    console.log(`${quantityToAdd} x "${product.name}" added/updated in cart.`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId),
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i._id === productId);
      if (!item) return prevItems;

      // Handle cases where stock could be undefined or null
      const itemStock =
        item.stock !== undefined && item.stock !== null
          ? Number(item.stock)
          : 0;

      // Only check stock if the new quantity is higher than the current one
      if (newQuantity > item.quantity && newQuantity > itemStock) {
        showAlert(
          `Cannot set quantity to ${newQuantity}. Only ${itemStock} available in stock.`,
        );
        return prevItems;
      }

      // If the new quantity is 0 or less, remove the item
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item._id !== productId);
      }

      // Update the quantity
      return prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item,
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

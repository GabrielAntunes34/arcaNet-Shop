import React from 'react';
import styles from './CartItem.module.css';
import Button from '../../../components/Button/Button';

/**
 * Displays a single product entry inside the shopping cart.
 *
 * @param {Object} props - Component props
 * @param {string} props.image - Path to the product image
 * @param {string} props.title - Product title
 * @param {number} props.price - Unit price of the product
 * @param {number} props.quantity - Quantity of this product in the cart
 * @param {number} props.stock - Available stock of this product
 * @param {function} props.onIncrease - Called to increase the product quantity
 * @param {function} props.onDecrease - Called to decrease the product quantity
 * @param {function} props.onRemove - Called to remove the product from the cart
 */

const CartItem = ({
  image,
  title,
  price,
  quantity,
  stock,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  const totalPrice = (price * quantity).toFixed(2); // Calculate the subtotal for this item
  
  // Solve cases where the stock is undefined or null
  const stockNumber = stock !== undefined && stock !== null ? Number(stock) : 0;
  const isMaxQuantity = quantity >= stockNumber;

  return (
    <div className={styles.item}>
      {/* Product image */}
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.details}>
        {/* Product title */}
        <h3 className={styles.name}>{title}</h3>

        {/* Price and subtotal */}
        <p className={styles.price}>Unit price: $ {price.toFixed(2)}</p>
        <p className={styles.total}>Subtotal: $ {totalPrice}</p>
        
        {/* Stock information */}
        <p className={styles.stock}>Available: {stockNumber} in stock</p>

        {/* Quantity controls */}
        <div className={styles.controls}>
          <Button onClick={onDecrease} variant="classic"> - </Button>
          <span className={styles.quantity}>{quantity}</span>
          <Button 
            onClick={onIncrease} 
            variant="classic"
            disabled={isMaxQuantity}
            title={isMaxQuantity ? "Maximum quantity reached" : "Increase quantity"}
          > 
            + 
          </Button>
          <Button onClick={onRemove} variant="danger"> Delete </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

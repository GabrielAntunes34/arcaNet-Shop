import React from 'react';
import styles from './ProductCard.module.css';
import Button from '../Button/Button';

/**
 * Displays a product card for listing items on a page.
 *
 * @param {Object} props - Component props
 * @param {string} props.image - URL to the product image
 * @param {string} props.title - Title or name of the product
 * @param {string} props.description - Short description of the product
 * @param {number|string} props.price - Product price
 * @param {function} props.onAddToCart - Callback triggered when "Add to cart" is clicked
 */
const ProductCard = ({ image, title, description, price, onAddToCart }) => {
  return (
    <div className={styles.card}>
      {/* Product image */}
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.info}>
        {/* Product title and description */}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {/* Product price */}
        <p className={styles.price}>$ {Number(price).toFixed(2)}</p>

        {/* Add to cart button */}
        <Button onClick={onAddToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

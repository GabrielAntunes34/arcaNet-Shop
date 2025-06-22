import React from 'react';
import styles from './ProductCard.module.css';
import Button from '../../../components/Button/Button'; // Assuming this path is correct
import { Link } from 'react-router-dom'; // Import Link

/**
 * Displays a product card for listing items on a page.
 * The card itself is a link to the product's detail page.
 *
 * @param {Object} props - Component props
 * @param {string|number} props.id - The unique identifier for the product (for linking)
 * @param {string} props.image - URL to the product image
 * @param {string} props.title - Title or name of the product
 * @param {string} props.description - Short description of the product (optional for card view)
 * @param {number|string} props.price - Product price
 * @param {number|string} props.stock - Available stock of the product
 * @param {function} props.onAddToCart - Callback triggered when "Add to cart" is clicked
 */
const ProductCard = ({ id, image, title, description, price, stock, onAddToCart }) => {
  
  // Prevent click on button from navigating
  const handleButtonClick = (event) => {
    event.stopPropagation(); // Stop the click from bubbling up to the Link
    event.preventDefault(); // Prevent default link behavior if the button itself was wrapped in another link by mistake
    if (onAddToCart) {
      onAddToCart();
    }
  };

  // Trata casos onde stock pode ser undefined ou null
  const stockNumber = stock !== undefined && stock !== null ? Number(stock) : 0;
  const isOutOfStock = stockNumber <= 0;

  return (
    <Link to={`/products/${id}`} className={styles.cardLink}> {/* Link to product detail page */}
      <div className={styles.card}>
        {/* Product image */}
        <img src={image} alt={title} className={styles.image} />

        <div className={styles.info}>
          {/* Product title and description */}
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>} {/* Conditionally render description */}

          {/* Product price */}
          <p className={styles.price}>$ {Number(price).toFixed(2)}</p>

          {/* Stock information */}
          <p className={styles.stock}>
            {isOutOfStock ? 'Out of Stock' : `${stockNumber} in stock`}
          </p>

          {/* Add to cart button */}
          <Button 
            onClick={handleButtonClick}
            disabled={isOutOfStock}
            variant={isOutOfStock ? "disabled" : "primary"}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
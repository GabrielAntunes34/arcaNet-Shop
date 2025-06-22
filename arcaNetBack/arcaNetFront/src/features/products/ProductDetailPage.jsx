import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ProductDetailPage.module.css';
import Button from '../../components/Button/Button';
import api from '../../services/api';

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productRes, categoriesRes] = await Promise.all([
          api.get(`/products/${productId}`),
          api.get('/categories')
        ]);

        const fetchedProduct = productRes.data;
        const allCategories = categoriesRes.data;

        setProduct(fetchedProduct);
        setCategories(allCategories);

        const activeCategories = new Map(
          allCategories
            .filter(cat => cat.status === 'Active')
            .map(cat => [cat._id, cat])
        );

        const productActiveCategories = (fetchedProduct.categories || [])
          .map(prodCat => activeCategories.get(prodCat.id))
          .filter(Boolean);

        setDisplayedCategories(productActiveCategories);
        setIsAvailable(true);
      } catch (err) {
        console.error('Error fetching product or categories:', err);
        setProduct(null);
        setIsAvailable(false);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    if (product && quantity > 0 && isAvailable && product.stock > 0) {
      addToCart(product, quantity);
    }
  };

  if (isLoading) return <p className={styles.message}>Loading...</p>;
  if (!product) return (
    <div className={styles.messageContainer}>
      <p className={styles.message}>Product not found.</p>
      <Link to="/products" className={styles.backLink}>
        <Button variant="secondary">Back</Button>
      </Link>
    </div>
  );
  if (!isAvailable) return (
    <div className={styles.messageContainer}>
      <h2>{product.name}</h2>
      <img src={product.photo || 'https://via.placeholder.com/200x300.png?text=No+Image'} alt={product.name} className={styles.unavailableProductImage} />
      <p className={styles.unavailableMessage}>Product unavailable.</p>
      <Link to="/products" className={styles.backLink}>
        <Button variant="secondary">Back</Button>
      </Link>
    </div>
  );

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.imageColumn}>
        <img src={product.photo || 'https://via.placeholder.com/400x600.png?text=No+Image'} alt={product.name} className={styles.productImage} />
      </div>
      <div className={styles.detailsColumn}>
        <h2>{product.name}</h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.categoryTags}>
          {displayedCategories.length > 0 && <span>Categories: </span>}
          {displayedCategories.map(cat => (
            <span key={cat._id} className={styles.categoryTag}>{cat.name}</span>
          ))}
        </div>
        <p className={styles.description}>{product.description}</p>
        {product.stock > 0 ? (
          <p className={styles.stockInfo}>{product.stock} in stock</p>
        ) : (
          <p className={`${styles.stockInfo} ${styles.outOfStock}`}>Out of stock!</p>
        )}
        <label htmlFor="quantity" className={styles.quantityLabel}>Quantity</label>
        <select
          id="quantity"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Math.min(parseInt(e.target.value), product.stock)))}
          className={styles.quantitySelect}
          disabled={product.stock === 0}
        >
          {Array.from({ length: Math.min(product.stock || 0, 10) }, (_, i) => i + 1).map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          variant={product.stock > 0 ? "primary" : "disabled"}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

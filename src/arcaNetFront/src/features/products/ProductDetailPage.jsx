import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './ProductDetailPage.module.css';
import Button from '../../components/Button/Button';

const ProductDetailPage = () => {
  const { id: productIdFromUrl } = useParams();
  const [product, setProduct] = useState(null);
  const [allSystemCategories, setAllSystemCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch product
        console.log(`Fetching product with ID: ${productIdFromUrl}`);
        const productResp = await fetch(
          `http://localhost:3000/product/${productIdFromUrl}`
        );
        if (!productResp.ok) {
          throw new Error(`Product not found, status: ${productResp.status}`);
        }
        const productData = await productResp.json();

        // Fetch categories
        const categoriesResp = await fetch('http://localhost:3000/category');
        if (!categoriesResp.ok) {
          throw new Error(
            `Error fetching categories, status: ${categoriesResp.status}`
          );
        }
        const categoriesData = await categoriesResp.json();

        setProduct(productData.data);
        setAllSystemCategories(categoriesData.data);
        console.log('Product data:', productData.data);
        console.log('Categories data:', categoriesData.data);

        // Filter active categories that belong to the product
        const activeSystemCategoriesMap = new Map(
          categoriesData.data
            .filter((cat) => cat.status === 'Active')
            .map((cat) => [cat.id, cat])
        );

        const productActiveCategories = (productData.categories || [])
          .map((prodCat) => activeSystemCategoriesMap.get(prodCat.id))
          .filter(Boolean);

        setDisplayedCategories(productActiveCategories);
        setIsAvailable(true);
      } catch (error) {
        console.error('Error loading data from API:', error);
        setProduct(null);
        setIsAvailable(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productIdFromUrl]);

  const handleAddToCart = () => {
    if (product && quantity > 0 && isAvailable && product.stock > 0) {
      addToCart(product, quantity);
    }
  };

  if (isLoading) return <p className={styles.message}>Loading...</p>;

  if (!product)
    return (
      <div className={styles.messageContainer}>
        <p className={styles.message}>Product not found.</p>
        <Link to="/products" className={styles.backLink}>
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
    );

  if (!isAvailable)
    return (
      <div className={styles.messageContainer}>
        <h2>{product.name}</h2>
        <img
          src={
            product.image ||
            'https://via.placeholder.com/200x300.png?text=No+Image'
          }
          alt={product.name}
          className={styles.unavailableProductImage}
        />
        <p className={styles.unavailableMessage}>Product unavailable.</p>
        <Link to="/products" className={styles.backLink}>
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
    );

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.imageColumn}>
        <img
          src={
            product.image ||
            'https://via.placeholder.com/400x600.png?text=No+Image'
          }
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.detailsColumn}>
        <h2>{product.name}</h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>

        <div className={styles.categoryTags}>
          {displayedCategories.length > 0 && <span>Categories: </span>}
          {displayedCategories.map((cat) => (
            <span key={cat.id} className={styles.categoryTag}>
              {cat.name}
            </span>
          ))}
        </div>

        <p className={styles.description}>{product.description}</p>

        {product.stock > 0 ? (
          <p className={styles.stockInfo}>{product.stock} in stock</p>
        ) : (
          <p className={`${styles.stockInfo} ${styles.outOfStock}`}>Out of stock!</p>
        )}

        <label htmlFor="quantity" className={styles.quantityLabel}>
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.max(1, Math.min(parseInt(e.target.value), product.stock))
            )
          } // Ensure value stays between 1 and available stock
          className={styles.quantitySelect}
          disabled={product.stock === 0}
        >
          {Array.from(
            { length: Math.min(product.stock || 0, 10) },
            (_, i) => i + 1
          ).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>

        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          variant={product.stock > 0 ? 'primary' : 'disabled'}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

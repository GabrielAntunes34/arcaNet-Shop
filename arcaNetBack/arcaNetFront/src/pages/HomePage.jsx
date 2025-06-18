// src/pages/HomePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';                         // ← chamada real à API
import Carousel from '../components/Carousel/Carousel.jsx';
import ProductCard from '../features/products/ProductCard/ProductCard.jsx';
import { CartContext } from '../context/CartContext.jsx';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [highlightedProducts, setHighlightedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  // Busca produtos destacados no backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');            // GET /products
        const highlighted = data.filter((p) => p.isHighlighted);
        setHighlightedProducts(highlighted);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (product) addToCart(product, 1);
  };

  return (
    <div className={styles.homePageContainer}>
      <section className={styles.introSection}>
        <h2 className={styles.mainTitle}>
          Who we are and our mission with our products
        </h2>
        <p className={styles.introParagraph}>
          At Mother Djilva &amp; Co, we believe in the magic of intuition,
          guidance, and self-discovery. Founded by passionate tarot enthusiasts,
          our mission is to make the timeless wisdom of tarot accessible to
          everyone. Each deck we offer is carefully curated to inspire, empower,
          and connect you with your inner voice.
        </p>
        <p className={styles.introParagraph}>
          Our mission is simple: to provide beautiful, high-quality tarot cards
          that spark transformation, insight, and a deeper connection to the
          journey of life. Whether you’re a seasoned reader or just beginning
          your path, we are here to support your practice with tools that speak
          to the soul. We believe tarot is more than cards—it’s a bridge to
          clarity, growth, and magic in everyday life.
        </p>
      </section>

      <section className={styles.highlightedProductsSection}>
        <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>
          Highlighted Products
        </h2>

        {highlightedProducts.length > 0 ? (
          <Carousel
            items={highlightedProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.photo}
                title={product.name}
                description={product.description}
                price={product.price}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          />
        ) : (
          <p className={styles.noProductsMessage}>
            No highlighted products available at the moment.
          </p>
        )}
      </section>
    </div>
  );
};

export default HomePage;

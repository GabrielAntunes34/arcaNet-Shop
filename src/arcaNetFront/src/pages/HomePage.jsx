import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { defaultInitialProducts } from '../tests/mockData.jsx';
import Carousel from '../components/Carousel/Carousel.jsx';
import ProductCard from '../features/products/ProductCard/ProductCard.jsx';
import { CartContext } from '../context/CartContext.jsx';
import styles from './HomePage.module.css';

const HomePage = () => {
    // Inicializing the state with an empty array
    const [highlighted_products, setHighlightedProducts] = useState([]);

    useEffect(() => {
        let products = [];
        try {
            const storedProducts = localStorage.getItem('adminProducts');
            products = storedProducts ? JSON.parse(storedProducts) : defaultInitialProducts;
        } catch (error) {
            console.error("Error reading products from localStorage:", error);
            products = defaultInitialProducts;
        }

        const highlighted = products.filter(product => product.isHighlighted);
        setHighlightedProducts(highlighted);
    }, []);

    const { addToCart } = useContext(CartContext);
    const handleProductAddToCart = (product) => {
        if (product) addToCart(product, 1);
    };

    return (
        <div className={styles.homePageContainer}>
            <section className={styles.introSection}>
                <h2 className={styles.mainTitle}> Who we are and our mission with our products </h2>
                <p className={styles.introParagraph}> At Mother Djilva & Co, we believe in the magic of intuition, guidance, and self-discovery. Founded by passionate tarot enthusiasts, our mission is to make the timeless wisdom of tarot accessible to everyone. Each deck we offer is carefully curated to inspire, empower, and connect you with your inner voice.</p>
                <p className={styles.introParagraph}> Our mission is simple: to provide beautiful, high-quality tarot cards that spark transformation, insight, and a deeper connection to the journey of life. Whether you’re a seasoned reader or just beginning your path, we are here to support your practice with tools that speak to the soul. We believe tarot is more than cards—it’s a bridge to clarity, growth, and magic in everyday life.</p>
            </section>

            <section className={styles.highlightedProductsSection}>
              {/* A inline style textAlign: 'center' pode ser mantida ou movida para o CSS module */}
              <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Highlighted Products</h2>
              {highlighted_products.length > 0 ? (
                <Carousel items={
                  highlighted_products.map(product => (
                    <ProductCard
                      key={product.id} // Adding key for lists
                      id={product.id}
                      image={product.photo}
                      title={product.name}
                      description={product.description} // Product cart threats long descriptions
                      price={product.price}
                      onAddToCart={() => handleProductAddToCart(product)}
                    />
                  ))
                } />
              ) : (
                // Special messages if there are no products
                <p className={styles.noProductsMessage}>No highlighted products available at the moment.</p>
              )}
            </section>
      </div>
  );
};

export default HomePage;
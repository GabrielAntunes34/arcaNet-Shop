import React, { useState, useEffect, useContext } from 'react';
import Carousel from '../components/Carousel/Carousel.jsx';
import ProductCard from '../features/products/ProductCard/ProductCard.jsx';
import { CartContext } from '../context/CartContext.jsx';
import styles from './HomePage.module.css';

const HomePage = () => {
    const [highlighted_products, setHighlightedProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchHighlightedProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/product', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                if (!response.ok) throw new Error('Failed to fetch products');

                const result = await response.json();
                const allProducts = Array.isArray(result.data) ? result.data : [];
                const highlighted = allProducts.filter(p => p.highlighted); 
                setHighlightedProducts(highlighted);
            } catch (error) {
                console.error('Error fetching highlighted products:', error);
                setHighlightedProducts([]);
            }
        };

        fetchHighlightedProducts();
    }, []);

    const handleProductAddToCart = (product) => {
        if (product) {
            addToCart(product, 1);
        }
    };

    return (
        <div className={styles.homePageContainer}>
            <section className={styles.introSection}>
                <h2 className={styles.mainTitle}>Who we are and our mission with our products</h2>
                <p className={styles.introParagraph}>
                    At Mother Djilva & Co, we believe in the magic of intuition, guidance, and self-discovery...
                </p>
                <p className={styles.introParagraph}>
                    Our mission is simple: to provide beautiful, high-quality tarot cards...
                </p>
            </section>

            <section className={styles.highlightedProductsSection}>
                <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>Highlighted Products</h2>
                {highlighted_products.length > 0 ? (
                    <Carousel
                        items={highlighted_products.map(product => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                image={product.image}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                stock={product.stock}
                                onAddToCart={() => handleProductAddToCart(product)}
                            />
                        ))}
                    />
                ) : (
                    <p className={styles.noProductsMessage}>No highlighted products available at the moment.</p>
                )}
            </section>
        </div>
    );
};

export default HomePage;

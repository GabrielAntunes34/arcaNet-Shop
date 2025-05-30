// src/features/products/ProductDetailPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importe Link se precisar de navegação
import { CartContext } from '../../context/CartContext'; // Ajuste o caminho se necessário
import styles from './ProductDetailPage.module.css'; // Certifique-se que este arquivo CSS existe
import Button from '../../components/Button/Button'; // Supondo que você use seu componente Button
import { defaultInitialProducts, defaultInitialCategories } from '../../tests/mockData'; 

const ProductDetailPage = () => {
    const { id: productIdFromUrl } = useParams();
    const [product, setProduct] = useState(null);
    const [allSystemCategories, setAllSystemCategories] = useState(() => {
        try {
            const stored = localStorage.getItem('adminCategories');
            const parsed = stored ? JSON.parse(stored) : null;
            return (parsed && parsed.length > 0) ? parsed : defaultInitialCategories;
        } catch (e) {
            console.error("Error reading categories (ProductDetailPage):", e);
            return defaultInitialCategories;
        }
    });

    const [displayedCategories, setDisplayedCategories] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setIsLoading(true);
        let productData = null;
        try {
            const storedProducts = localStorage.getItem('adminProducts');
            const products = (storedProducts && JSON.parse(storedProducts).length > 0) 
                ? JSON.parse(storedProducts) 
                : defaultInitialProducts;
            productData = products.find(p => p.id === productIdFromUrl);
        } catch (error) {
            console.error("Error loading product from localStorage:", error);
            productData = defaultInitialProducts.find(p => p.id === productIdFromUrl); // Fallback to default mock
        }

        if (productData) {
            setProduct(productData);
            const activeSystemCategoriesMap = new Map(
                allSystemCategories
                    .filter(cat => cat.status === 'Active')
                    .map(cat => [cat.id, cat])
            );
            const productActiveCategories = (productData.categories || [])
                .map(prodCat => activeSystemCategoriesMap.get(prodCat.id))
                .filter(Boolean);

            setDisplayedCategories(productActiveCategories);
            setIsAvailable(true);
        } else {
            setProduct(null);
            setIsAvailable(false);
        }
        setIsLoading(false);
    }, [productIdFromUrl, allSystemCategories]);

    const handleAddToCart = () => {
        if (product && quantity > 0 && isAvailable && product.stock > 0) {
            addToCart(product, quantity);
        }
    };

    if (isLoading) return <p className={styles.message}>Loading...</p>;
    if (!product) return (
        <div className={styles.messageContainer}>
            <p className={styles.message}>Product not found.</p>
            <Link to="/products" className={styles.backLink}><Button variant="secondary">Back</Button></Link>
        </div>
    );
    if (!isAvailable) return (
        <div className={styles.messageContainer}>
            <h2>{product.name}</h2>
            <img src={product.photo || 'https://via.placeholder.com/200x300.png?text=No+Image'} alt={product.name} className={styles.unavailableProductImage} />
            <p className={styles.unavailableMessage}>Product unavailable.</p>
            <Link to="/products" className={styles.backLink}><Button variant="secondary">Back</Button></Link>
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
                        <span key={cat.id} className={styles.categoryTag}>{cat.name}</span>
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
                    id="quantity" value={quantity}
                    onChange={e => setQuantity(Math.max(1, Math.min(parseInt(e.target.value), product.stock)))} // Garante entre 1 e estoque
                    className={styles.quantitySelect} disabled={product.stock === 0}>
                    {Array.from({ length: Math.min(product.stock || 0, 10) }, (_, i) => i + 1).map(q => (
                        <option key={q} value={q}>{q}</option>
                    ))}
                </select>
                <Button onClick={handleAddToCart} disabled={product.stock === 0}
                    variant={product.stock > 0 ? "primary" : "disabled"}>
                    {product.stock === 0 ? "Out of Stock" : "Add to cart"}
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
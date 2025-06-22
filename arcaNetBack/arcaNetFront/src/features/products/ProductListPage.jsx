import React, { useState, useEffect, useContext, useMemo } from 'react';
import { CartContext } from '../../context/CartContext';
import ProductGrid from './ProductGrid/ProductGrid';
import ProductCard from './ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import useProductFilters from './useProductFilters';
import api from '../../services/api';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  const [allSystemProducts, setAllSystemProducts] = useState([]);
  const [allSystemCategories, setAllSystemCategories] = useState([]);
  const [productsReadyForDisplay, setProductsReadyForDisplay] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setAllSystemProducts(productsRes.data);
        setAllSystemCategories(categoriesRes.data);
      } catch (err) {
        console.error('Erro ao buscar produtos ou categorias:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const activeCategoryIds = new Set(
      allSystemCategories
        .filter(cat => cat.status === 'Active')
        .map(cat => cat._id)
    );

    const visibleProducts = allSystemProducts.filter(product => {
      if (!product.categories || product.categories.length === 0) return true;
      return product.categories.some(cat => activeCategoryIds.has(cat.id));
    });

    setProductsReadyForDisplay(visibleProducts);
  }, [allSystemProducts, allSystemCategories]);

  const priceRangeForFilter = useMemo(() => {
    const prices = productsReadyForDisplay.map(p => p.price).filter(p => typeof p === 'number');
    if (prices.length === 0) return { min: 0, max: 1000 };
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    return { min, max: max <= min ? min + 100 : max };
  }, [productsReadyForDisplay]);

  const {
    setSearchTerm,
    categoryFilter,
    toggleCategory,
    priceFilter,
    handleMinPriceChange,
    handleMaxPriceChange,
    filteredProducts
  } = useProductFilters(productsReadyForDisplay, priceRangeForFilter);

  const handleProductAddToCart = (product) => {
    if (product) addToCart(product, 1);
  };

  const categoryNamesForSidebar = useMemo(() => {
    const names = new Set();
    const activeCategoriesData = new Map(
      allSystemCategories
        .filter(cat => cat.status === 'Active')
        .map(cat => [cat._id, cat.name])
    );

    productsReadyForDisplay.forEach(product => {
      (product.categories || []).forEach(cat => {
        if (activeCategoriesData.has(cat.id)) {
          names.add(activeCategoriesData.get(cat.id));
        }
      });
    });

    return Array.from(names).sort();
  }, [productsReadyForDisplay, allSystemCategories]);

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <h3>Filter by Category</h3>
        {categoryNamesForSidebar.length > 0 ? categoryNamesForSidebar.map(catName => (
          <label key={catName} className={styles.categoryLabel}>
            <input
              type="checkbox"
              checked={categoryFilter.includes(catName.toLowerCase())}
              onChange={() => toggleCategory(catName.toLowerCase())}
            />
            {catName}
          </label>
        )) : <p className={styles.noFilters}>No categories.</p>}

        <h3>Filter by Price</h3>
        <div className={styles.priceFilter}>
          <label htmlFor="minPriceSliderList">Min: ${priceFilter.min.toFixed(2)}</label>
          <input
            type="range"
            id="minPriceSliderList"
            min={priceRangeForFilter.min}
            max={priceRangeForFilter.max}
            value={priceFilter.min}
            onChange={(e) => handleMinPriceChange(e.target.valueAsNumber)}
            step="1"
          />
        </div>
        <div className={styles.priceFilter}>
          <label htmlFor="maxPriceSliderList">Max: ${priceFilter.max.toFixed(2)}</label>
          <input
            type="range"
            id="maxPriceSliderList"
            min={priceRangeForFilter.min}
            max={priceRangeForFilter.max}
            value={priceFilter.max}
            onChange={(e) => handleMaxPriceChange(e.target.valueAsNumber)}
            step="1"
          />
        </div>
      </aside>

      <main className={styles.mainContent}>
        <SearchBar onSearch={setSearchTerm} placeholder="Search products..." />
        {filteredProducts.length > 0 ? (
          <ProductGrid>
            {filteredProducts.map(p => (
              <ProductCard
                key={p._id}
                id={p._id}
                image={p.photo}
                title={p.name}
                description={p.description}
                price={p.price}
                onAddToCart={() => handleProductAddToCart(p)}
              />
            ))}
          </ProductGrid>
        ) : (
          <p>No products found. Try adjusting filters or search.</p>
        )}
      </main>
    </div>
  );
};

export default ProductListPage;

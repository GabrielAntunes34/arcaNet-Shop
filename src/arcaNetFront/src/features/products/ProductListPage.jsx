import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid/ProductGrid';
import ProductCard from './ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import useProductFilters from './useProductFilters.jsx';
import styles from './ProductListPage.module.css';
import { CartContext } from '../../context/CartContext';

const ProductListPage = () => {
  const [allSystemProducts, setAllSystemProducts] = useState([]);
  const [allSystemCategories, setAllSystemCategories] = useState([]);
  const [productsReadyForDisplay, setProductsReadyForDisplay] = useState([]);

  // 🔁 Buscar produtos e categorias do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:3000/product', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }),
          fetch('http://localhost:3000/category', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          }),
        ]);

        const productsJson = await productsRes.json();
        const categoriesJson = await categoriesRes.json();

        setAllSystemProducts(productsJson.data || []);
        setAllSystemCategories(categoriesJson.data || []);
      } catch (err) {
        console.error('Error fetching products or categories:', err);
        setAllSystemProducts([]);
        setAllSystemCategories([]);
      }
    };

    fetchData();
  }, []);

  // 🔄 Atualiza os produtos visíveis com base nas categorias ativas
  useEffect(() => {
    const activeCategoriesMap = new Map(
      allSystemCategories
        .filter(cat => cat.status === 'Active')
        .map(cat => [cat._id, true])
    );

    const visibleProducts = allSystemProducts.filter(product => {
      if (!product.categories || product.categories.length === 0) return true;
      return product.categories.some(catId => activeCategoriesMap.has(catId));
    });

    // Normaliza categorias no produto para formato { id, name }
    const normalized = visibleProducts.map(product => ({
      ...product,
      categories: (product.categories || []).map(catId => {
        const found = allSystemCategories.find(c => c._id === catId);
        return found ? { id: catId, name: found.name } : { id: catId, name: 'Unknown' };
      }),
    }));

    setProductsReadyForDisplay(normalized);
  }, [allSystemProducts, allSystemCategories]);

  // Prepara faixa de preço com base nos produtos visíveis
  const priceRangeForFilter = useMemo(() => {
    const prices = productsReadyForDisplay.map(p => Number(p.price)).filter(p => !isNaN(p));
    const min = Math.min(...prices, 0);
    const max = Math.max(...prices, 1000);
    return { min: Math.floor(min), max: Math.ceil(max <= min ? min + 100 : max) };
  }, [productsReadyForDisplay]);

  // Hook de filtros reutilizável
  const {
    setSearchTerm,
    categoryFilter,
    toggleCategory,
    priceFilter,
    handleMinPriceChange,
    handleMaxPriceChange,
    filteredProducts,
  } = useProductFilters(productsReadyForDisplay, priceRangeForFilter);

  const { addToCart } = useContext(CartContext);
  const handleProductAddToCart = (product) => {
    if (product) addToCart(product, 1);
  };

  // Lista de nomes únicos de categorias ativas, com letras corretas
  const categoryNamesForSidebar = useMemo(() => {
    const activeCategories = new Map(
      allSystemCategories
        .filter(cat => cat.status === 'Active')
        .map(cat => [cat._id, cat.name])
    );

    const names = new Set();
    productsReadyForDisplay.forEach(product => {
      (product.categories || []).forEach(cat => {
        if (activeCategories.has(cat.id)) {
          names.add(activeCategories.get(cat.id));
        }
      });
    });

    return Array.from(names).sort();
  }, [productsReadyForDisplay, allSystemCategories]);

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}>
        <h3>Filter by Category</h3>
        {categoryNamesForSidebar.length > 0 ? (
          categoryNamesForSidebar.map(catName => (
            <label key={catName} className={styles.categoryLabel}>
              <input
                type="checkbox"
                checked={categoryFilter.includes(catName.toLowerCase())}
                onChange={() => toggleCategory(catName.toLowerCase())}
              />
              {catName}
            </label>
          ))
        ) : (
          <p className={styles.noFilters}>No categories.</p>
        )}

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
                image={p.image}
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

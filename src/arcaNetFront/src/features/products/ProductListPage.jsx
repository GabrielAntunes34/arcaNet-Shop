// src/features/products/ProductListPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid/ProductGrid'; // Certifique-se que este componente existe e funciona
import ProductCard from './ProductCard/ProductCard'; // Certifique-se que este componente existe e funciona
import SearchBar from '../../components/SearchBar/SearchBar';
import useProductFilters from './useProductFilters.jsx';
import styles from './ProductListPage.module.css'; // Certifique-se que este arquivo existe
import { CartContext } from '../../context/CartContext'; // Ajuste o caminho se necessário

// Dados de fallback caso o localStorage esteja vazio ou corrompido
// É importante que estes fallbacks sejam arrays vazios ou uma representação mínima,
// pois os dados principais virão do localStorage, que é gerenciado pela área de Admin.
import { defaultInitialProducts, defaultInitialCategories } from '../mockData.jsx'; 

const ProductListPage = () => {
  const [allSystemProducts, setAllSystemProducts] = useState(() => {
      try {
          const stored = localStorage.getItem('adminProducts');
          const parsed = stored ? JSON.parse(stored) : null;
          return (parsed && parsed.length > 0) ? parsed : defaultInitialProducts;
      } catch (e) {
          console.error("Error reading products from localStorage (ProductListPage):", e);
          return defaultInitialProducts;
      }
  });

  const [allSystemCategories, setAllSystemCategories] = useState(() => {
      try {
          const stored = localStorage.getItem('adminCategories');
          const parsed = stored ? JSON.parse(stored) : null;
          return (parsed && parsed.length > 0) ? parsed : defaultInitialCategories;
      } catch (e) {
          console.error("Error reading categories from localStorage (ProductListPage):", e);
          return defaultInitialCategories;
      }
  });

  const [productsReadyForDisplay, setProductsReadyForDisplay] = useState([]);

  useEffect(() => {
      const activeCategoriesMap = new Map(
          allSystemCategories
              .filter(cat => cat.status === 'Active')
              .map(cat => [cat.id, true])
      );

      const visibleProducts = allSystemProducts.filter(product => {
          if (!product.categories || product.categories.length === 0) {
              return true; // REGRA: Mostrar produtos sem categoria
          }
          return product.categories.some(prodCat => activeCategoriesMap.has(prodCat.id));
      });
      setProductsReadyForDisplay(visibleProducts);
  }, [allSystemProducts, allSystemCategories]);

  const priceRangeForFilter = React.useMemo(() => {
    if (productsReadyForDisplay.length === 0) return { min: 0, max: 1000 }; // Default se não houver produtos
    const prices = productsReadyForDisplay.map(p => p.price).filter(p => typeof p === 'number');
    if (prices.length === 0) return { min: 0, max: 1000 };
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return {
        min: Math.floor(min),
        // Garante um range mínimo se todos os produtos tiverem o mesmo preço ou não houver produtos
        max: Math.ceil(max <= min ? min + 100 : max) 
    };
}, [productsReadyForDisplay]);


const {
  setSearchTerm,
  categoryFilter,    // Array de nomes de categoria em minúsculas (do hook)
  toggleCategory,    // Função do hook para ser chamada com nome de categoria em minúsculas
  priceFilter,       // Objeto {min, max} atual do filtro de preço (do hook)
  handleMinPriceChange, // Função do hook
  handleMaxPriceChange, // Função do hook
  filteredProducts,  // Array de produtos filtrados (do hook)
} = useProductFilters(productsReadyForDisplay, priceRangeForFilter); // Passa o range dinâmico

  const { addToCart } = useContext(CartContext);
  const handleProductAddToCart = (product) => {
      if (product) addToCart(product, 1);
  };

  const categoryNamesForSidebar = React.useMemo(() => {
    const names = new Set();
    const activeCategoriesData = new Map(
        allSystemCategories
            .filter(cat => cat.status === 'Active')
            .map(cat => [cat.id, cat.name]) // Pegamos o nome original (com maiúsculas)
    );
    productsReadyForDisplay.forEach(product => {
        (product.categories || []).forEach(prodCat => {
            if (activeCategoriesData.has(prodCat.id)) {
                names.add(activeCategoriesData.get(prodCat.id)); // Adiciona o nome original
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
                      // categoryFilter do hook armazena nomes em minúsculas
                      checked={categoryFilter.includes(catName.toLowerCase())}
                      // toggleCategory do hook espera nomes em minúsculas
                      onChange={() => toggleCategory(catName.toLowerCase())}
                  />
                  {catName} {/* Exibe o nome com maiúsculas/minúsculas originais */}
              </label>
          )) : <p className={styles.noFilters}>No categories.</p>}

          <h3>Filter by Price</h3>
          <div className={styles.priceFilter}>
              {/* priceFilter.min vem do hook e já está atualizado */}
              <label htmlFor="minPriceSliderList">Min: ${priceFilter.min.toFixed(2)}</label>
              <input
                  type="range"
                  id="minPriceSliderList"
                  min={priceRangeForFilter.min} // O range geral dos produtos visíveis
                  max={priceRangeForFilter.max} // O range geral dos produtos visíveis
                  value={priceFilter.min}      // O valor atual do filtro de preço do hook
                  onChange={(e) => handleMinPriceChange(e.target.valueAsNumber)} // Passa número
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
      {/* ... o resto do JSX com SearchBar e ProductGrid usando filteredProducts ... */}
      <main className={styles.mainContent}>
          <SearchBar onSearch={setSearchTerm} placeholder="Search products..." />
          {filteredProducts.length > 0 ? (
              <ProductGrid>
                  {filteredProducts.map(p => (
                      <ProductCard
                          key={p.id}
                          id={p.id}
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
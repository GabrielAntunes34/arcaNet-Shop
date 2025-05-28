import React, { useState, useEffect } from 'react'; // useEffect is not directly used here, useState is also not directly used here after refactor
import ProductGrid from './ProductGrid/ProductGrid'; // Assuming ProductGrid is correctly implemented
import ProductCard from './ProductCard/ProductCard'; // Assuming ProductCard is correctly implemented
import SearchBar from '../../components/SearchBar/SearchBar'; // Assuming SearchBar is correctly implemented
import useProductFilters  from './useProductFilters.jsx';

// Mock data representing tarot decks
const allProducts = [
  { id: 1, name: "Death Tarot", price: 35.0, category: "death", photo: "url1" },
  { id: 2, name: "Moon Tarot", price: 40.0, category: "moon", photo: "url2" },
  { id: 3, name: "Fullmoon Tarot", price: 50.0, category: "fullmoon", photo: "url3" },
];

// Available categories for filtering
const categories = ["death", "moon", "fullmoon"];

// Price range constants
const minPrice = 0;
const maxPrice = 100;

/**
 * ProductListPage component displays the list of tarot decks.
 * It allows filtering by category, price range (using sliders), and search term.
 */
const ProductListPage = () => {
 
    const{
        searchTerm, // searchTerm is returned but not used in JSX, SearchBar likely uses setSearchTerm directly
        setSearchTerm,
        categoryFilter,
        toggleCategory,
        priceFilter,
        handleMinPriceChange,
        handleMaxPriceChange,
        filteredProducts,
    } = useProductFilters(allProducts, {min: minPrice, max: maxPrice}); // Corrected to pass {min, max}

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar filters */}
      <aside style={{ width: "200px", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h3>Filter by Category</h3>
        {categories.map(cat => (
          <label key={cat} style={{ display: "block", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={categoryFilter.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            {cat}
          </label>
        ))}

        <h3>Filter by Price</h3>
        <div>
          <label>Min: ${priceFilter.min}</label>
          <input
            type="range"
            min={minPrice} // Using constant minPrice
            max={maxPrice} // Using constant maxPrice
            value={priceFilter.min}
            onChange={(e) => handleMinPriceChange(e.target.value)}
          />
        </div>

        <div>
          <label>Max: ${priceFilter.max}</label>
          <input
            type="range"
            min={minPrice} // Using constant minPrice
            max={maxPrice} // Using constant maxPrice
            value={priceFilter.max}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
          />
        </div>
      </aside>

      {/* Main content: search and products */}
      <main style={{ flex: 1, padding: "1rem" }}>
        <SearchBar onSearch={setSearchTerm} placeholder="Search tarot decks..." />

        <ProductGrid>
          {filteredProducts.map(p => (
            <ProductCard
              id={p.id}
              image={p.photo}
              title={p.name}
              description={p.description}
              price={p.price}
              onAddToCart={() => alert(`Added ${p.name} to cart`)} // Make sure p.name is defined
            />
          ))}
        </ProductGrid>
      </main>
    </div>
  );
};

export default ProductListPage;
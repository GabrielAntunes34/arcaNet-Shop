import { useState, useEffect } from "react";

const useProductFilters = (productsToFilter, initialPriceRange = { min: 0, max: 1000 }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Internal state for price filter, initialized with the provided range
  const [priceFilter, setPriceFilter] = useState({
    min: initialPriceRange.min,
    max: initialPriceRange.max,
  });

  // State for category filter (array of category names in lowercase)
  const [categoryFilter, setCategoryFilter] = useState([]);

  // Effect to reset internal priceFilter when initialPriceRange changes
  useEffect(() => {
    setPriceFilter({
      min: initialPriceRange.min,
      max: initialPriceRange.max,
    });
  }, [initialPriceRange.min, initialPriceRange.max]);

  // Main effect to apply all filters
  useEffect(() => {
    // Ensure productsToFilter is an array before filtering
    if (!Array.isArray(productsToFilter)) {
      setFilteredProducts([]);
      return;
    }

    let processedProducts = productsToFilter;

    // 1. Filter by category (compare with product.categories, which is an array of objects)
    if (categoryFilter.length > 0) {
      processedProducts = processedProducts.filter(product => {
        if (!product.categories || product.categories.length === 0) {
          return false; // Or true, if products without categories should pass this filter
        }
        // Check if any of the product's categories (converted to lowercase) is in categoryFilter
        return product.categories.some(catObj => 
            typeof catObj.name === 'string' && categoryFilter.includes(catObj.name.toLowerCase())
        );
      });
    }

    // 2. Filter by price
    // Ensure product.price is a number before comparing
    processedProducts = processedProducts.filter(product => {
        const price = parseFloat(product.price);
        return !isNaN(price) && price >= priceFilter.min && price <= priceFilter.max;
    });

    // 3. Filter by search term (within the product name)
    if (searchTerm.trim() !== "") {
      processedProducts = processedProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(processedProducts);
  }, [productsToFilter, searchTerm, categoryFilter, priceFilter]);

  // Function to add/remove a category from the filter (expects lowercase category name)
  const toggleCategory = (categoryNameLowercase) => {
    setCategoryFilter((prev) =>
      prev.includes(categoryNameLowercase)
        ? prev.filter((c) => c !== categoryNameLowercase)
        : [...prev, categoryNameLowercase]
    );
  };

  // Functions to update the price range
  const handleMinPriceChange = (value) => {
    const newMin = Number(value);
    // Ensure new min does not exceed current max and is not less than global min
    setPriceFilter((prev) => ({
      ...prev,
      min: Math.max(initialPriceRange.min, Math.min(newMin, prev.max)),
    }));
  };

  const handleMaxPriceChange = (value) => {
    const newMax = Number(value);
    // Ensure new max is not less than current min and does not exceed global max
    setPriceFilter((prev) => ({
      ...prev,
      max: Math.min(initialPriceRange.max, Math.max(newMax, prev.min)),
    }));
  };

  return {
    searchTerm,               // For SearchBar input
    setSearchTerm,            // Allows SearchBar to update the term
    categoryFilter,           // Indicates which categories are active
    toggleCategory,           // Called by category checkboxes
    priceFilter,              // Current min/max values for the sliders
    handleMinPriceChange,     // For min price slider
    handleMaxPriceChange,     // For max price slider
    filteredProducts,         // Final list of filtered products to render
  };
};

export default useProductFilters;

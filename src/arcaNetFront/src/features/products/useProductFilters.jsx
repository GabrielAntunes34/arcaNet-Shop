import { useState, useEffect } from "react";

const useProductFilters = (products, priceRange = { min: 0, max: 100 }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState({
    min: priceRange.min,
    max: priceRange.max,
  });
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    // Ensure products is an array before attempting to filter
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = products;

    // Filter by category
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((p) => categoryFilter.includes(p.category));
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceFilter.min && p.price <= priceFilter.max
    );

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter, priceFilter]);

  const toggleCategory = (cat) => {
    setCategoryFilter((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleMinPriceChange = (value) => {
    const newMin = Math.min(Number(value), priceFilter.max);
    setPriceFilter((prev) => ({ ...prev, min: newMin }));
  };

  const handleMaxPriceChange = (value) => {
    const newMax = Math.max(Number(value), priceFilter.min);
    setPriceFilter((prev) => ({ ...prev, max: newMax }));
  };

  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    toggleCategory,
    priceFilter,
    handleMinPriceChange,
    handleMaxPriceChange,
    filteredProducts,
  };
};

export default useProductFilters;
// src/features/products/useProductFilters.jsx
import { useState, useEffect } from "react";

const useProductFilters = (productsToFilter, initialPriceRange = { min: 0, max: 1000 }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado interno para o filtro de preço, inicializado com o range fornecido
  const [priceFilter, setPriceFilter] = useState({
    min: initialPriceRange.min,
    max: initialPriceRange.max,
  });

  // Estado para o filtro de categorias (array de nomes de categoria em minúsculas)
  const [categoryFilter, setCategoryFilter] = useState([]);

  // Efeito para resetar o priceFilter interno quando o initialPriceRange (vindo das props) mudar
  useEffect(() => {
    setPriceFilter({
      min: initialPriceRange.min,
      max: initialPriceRange.max,
    });
  }, [initialPriceRange.min, initialPriceRange.max]); // Depende do range que vem de fora

  // Efeito principal para aplicar todos os filtros
  useEffect(() => {
    // Garante que productsToFilter é um array antes de tentar filtrar
    if (!Array.isArray(productsToFilter)) {
      setFilteredProducts([]);
      return;
    }

    let processedProducts = productsToFilter;

    // 1. Filtrar por categoria (comparando com product.categories, que é um array de objetos)
    if (categoryFilter.length > 0) {
      processedProducts = processedProducts.filter(product => {
        if (!product.categories || product.categories.length === 0) {
          return false; // Ou true, se produtos sem categoria devem passar por este filtro
        }
        // Verifica se alguma das categorias do produto (convertida para minúscula) está no categoryFilter
        return product.categories.some(catObj => 
            typeof catObj.name === 'string' && categoryFilter.includes(catObj.name.toLowerCase())
        );
      });
    }

    // 2. Filtrar por preço
    // Garante que product.price é um número antes de comparar
    processedProducts = processedProducts.filter(product => {
        const price = parseFloat(product.price);
        return !isNaN(price) && price >= priceFilter.min && price <= priceFilter.max;
    });


    // 3. Filtrar por termo de busca (no nome do produto)
    if (searchTerm.trim() !== "") {
      processedProducts = processedProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(processedProducts);
  }, [productsToFilter, searchTerm, categoryFilter, priceFilter]); // priceFilter agora é uma dependência

  // Função para adicionar/remover categoria do filtro (recebe nome da categoria em minúsculas)
  const toggleCategory = (categoryNameLowercase) => {
    setCategoryFilter((prev) =>
      prev.includes(categoryNameLowercase)
        ? prev.filter((c) => c !== categoryNameLowercase)
        : [...prev, categoryNameLowercase]
    );
  };

  // Funções para atualizar o range de preço
  const handleMinPriceChange = (value) => {
    const newMin = Number(value);
    // Garante que o novo min não ultrapasse o max atual e não seja menor que o min global
    setPriceFilter((prev) => ({
      ...prev,
      min: Math.max(initialPriceRange.min, Math.min(newMin, prev.max)),
    }));
  };

  const handleMaxPriceChange = (value) => {
    const newMax = Number(value);
    // Garante que o novo max não seja menor que o min atual e não ultrapasse o max global
    setPriceFilter((prev) => ({
      ...prev,
      max: Math.min(initialPriceRange.max, Math.max(newMax, prev.min)),
    }));
  };

  return {
    searchTerm,
    setSearchTerm,    // Para a SearchBar atualizar
    categoryFilter,   // Para a ProductListPage saber quais categorias estão ativas no filtro
    toggleCategory,   // Para os checkboxes de categoria chamarem
    priceFilter,      // Para a ProductListPage exibir os valores min/max atuais dos sliders
    handleMinPriceChange, // Para o slider de min preço
    handleMaxPriceChange, // Para o slider de max preço
    filteredProducts, // A lista final de produtos filtrados para a ProductListPage renderizar
  };
};

export default useProductFilters;
// src/features/admin/products/ManageProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Button from '../../../components/Button/Button';
import ProductTabCard from './ProductTabCard'; 
import styles from './ManageProductsPage.module.css'; 
import { defaultInitialProducts, defaultInitialCategories } from '../../../tests/mockData'; 


const ManageProductsPage = () => {
    const [products, setProducts] = useState(() => {
        try {
            const storedProducts = localStorage.getItem('adminProducts');
            return storedProducts ? JSON.parse(storedProducts) : defaultInitialProducts;
        } catch (error) {
            console.error("Error reading products from localStorage:", error);
            return defaultInitialProducts;
        }
    });
    // Para o modal de adicionar categoria ao produto
    const [allCategories, setAllCategories] = useState(() => {
        try {
            const storedCategories = localStorage.getItem('adminCategories');
            return storedCategories ? JSON.parse(storedCategories) : defaultInitialCategories; 
        } catch (error) {
            console.error("Error reading categories from localStorage for product page:", error);
            return defaultInitialCategories;
        }
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showHighlightedOnly, setShowHighlightedOnly] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            localStorage.setItem('adminProducts', JSON.stringify(products));
        } catch (error) {
            console.error("Error saving products to localStorage:", error);
        }
    }, [products]);

    // Lógica de Filtro
    const filteredProducts = products.filter(product => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesHighlightFilter = showHighlightedOnly ? product.isHighlighted : true;
        return matchesSearchTerm && matchesHighlightFilter;
    });

    const handleAddProduct = () => {
        navigate('/admin/products/add'); // Rota para a futura AddProductPage
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(prev => prev.filter(p => p.id !== productId));
        }
    };

    const handleToggleHighlight = (productId, newHighlightState) => {
        setProducts(prev =>
            prev.map(p => (p.id === productId ? { ...p, isHighlighted: newHighlightState } : p))
        );
    };

    const handleRemoveCategoryFromProduct = (productId, categoryIdToRemove) => {
        setProducts(prev =>
            prev.map(p => {
                if (p.id === productId) {
                    return {
                        ...p,
                        categories: p.categories.filter(cat => (typeof cat === 'object' ? cat.id : cat) !== categoryIdToRemove),
                    };
                }
                return p;
            })
        );
        alert(`Category removed from product ${productId}. (Mock)`);
    };

    const handleAddCategoryToProduct = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            alert("Product not found!");
            return;
        }
    
        const categoryNameInput = prompt("Enter the name of the category to add to this product:");
    
        if (categoryNameInput === null || categoryNameInput.trim() === "") {
            // Usuário cancelou ou não digitou nada
            return;
        }
    
        const categoryNameTrimmed = categoryNameInput.trim().toLowerCase();
    
        // Não precisa ta ativa o que ocorrar se ta incative é que nao deve aparecer em product list
        // Considera apenas categorias ativas e compara os nomes em minúsculas
        const categoryToAdd = allCategories.find(
            availCat => availCat.name.toLowerCase() === categoryNameTrimmed
        );
    
        if (!categoryToAdd) {
            alert(`Category "${categoryNameInput}" not found`);
            return;
        }
    
        // Verificar se o produto já tem essa categoria
        const productHasCategory = product.categories.some(
            cat => (typeof cat === 'object' ? cat.id : cat) === categoryToAdd.id
        );
    
        if (productHasCategory) {
            alert(`Product "${product.name}" already has the category "${categoryToAdd.name}".`);
            return;
        }
    
        // Adicionar a categoria ao produto
        setProducts(prevProducts =>
            prevProducts.map(p => {
                if (p.id === productId) {
                    return {
                        ...p,
                        categories: [...p.categories, { id: categoryToAdd.id, name: categoryToAdd.name }], // Adiciona como objeto
                    };
                }
                return p;
            })
        );
    
        alert(`Category "${categoryToAdd.name}" added to product "${product.name}".`);
    };

    const handleAddSupply = (productId) => {
        const amount = parseInt(prompt("Enter quantity to add to stock:", "1"), 10);
        if (!isNaN(amount) && amount > 0) {
            setProducts(prev =>
                prev.map(p => (p.id === productId ? { ...p, stock: p.stock + amount } : p))
            );
            alert(`${amount} added to stock for product ${productId}. (Mock)`);
        } else if (amount <=0){
            alert("Please enter a positive number.");
        }
    };


    return (
        <div className={styles.manageProductsPage}>
            <header className={styles.header}>
                <h1>Manage Products</h1>
                <p>Add, edit, or remove products from your store.</p>
            </header>

            <div className={styles.controls}>
                <SearchBar
                    onSearch={setSearchTerm}
                    placeholder="Search products..."
                />
                <div className={styles.filterButtons}>
                    <Button onClick={() => setShowHighlightedOnly(false)} variant={!showHighlightedOnly ? 'primary' : 'secondary'}>
                        Show All
                    </Button>
                    <Button onClick={() => setShowHighlightedOnly(true)} variant={showHighlightedOnly ? 'primary' : 'secondary'}>
                        Show Highlighted
                    </Button>
                </div>
                <Button onClick={handleAddProduct} variant="primary">
                    Add Product
                </Button>
            </div>

            <div className={styles.productList}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductTabCard
                            key={product.id}
                            product={product}
                            allSystemCategories={allCategories}
                            onDelete={handleDeleteProduct}
                            onToggleHighlight={handleToggleHighlight}
                            onRemoveCategoryFromProduct={handleRemoveCategoryFromProduct}
                            onAddCategoryToProduct={handleAddCategoryToProduct}
                            onAddSupply={handleAddSupply}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageProductsPage;
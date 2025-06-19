// src/features/admin/products/ManageProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Button from '../../../components/Button/Button';
import ProductTabCard from './ProductTabCard'; 
import styles from './ManageProductsPage.module.css'; 

const ManageProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showHighlightedOnly, setShowHighlightedOnly] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodRes = await fetch('http://localhost:3000/product', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const prodData = await prodRes.json();
                setProducts(Array.isArray(prodData.data) ? prodData.data : []);
            } catch (err) {
                console.error('Error fetching products:', err);
                setProducts([]);
            }

            try {
                const catRes = await fetch('http://localhost:3000/category', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                const catData = await catRes.json();
                setAllCategories(Array.isArray(catData.data) ? catData.data : []);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setAllCategories([]);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = Array.isArray(products)
        ? products.filter(product => {
            const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesHighlightFilter = showHighlightedOnly ? product.isHighlighted : true;
            return matchesSearchTerm && matchesHighlightFilter;
        })
        : [];

    const handleAddProduct = () => {
        navigate('/admin/products/add');
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const response = await fetch(`http://localhost:3000/product/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product.');
            }

            setProducts(prev => prev.filter(p => p._id !== productId));
            alert('Product deleted successfully.');
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Failed to delete product. See console for details.');
        }
    };

    const handleToggleHighlight = (productId, newHighlightState) => {
        setProducts(prev =>
            prev.map(p => (p._id === productId ? { ...p, isHighlighted: newHighlightState } : p))
        );
    };

    const handleRemoveCategoryFromProduct = (productId, categoryIdToRemove) => {
        setProducts(prev =>
            prev.map(p => {
                if (p._id === productId) {
                    return {
                        ...p,
                        categories: p.categories.filter(cat => {
                            const catId = typeof cat === 'object' ? cat._id ?? cat.id : cat;
                            return catId !== categoryIdToRemove;
                        }),
                    };
                }
                return p;
            })
        );
        alert(`Category removed from product ${productId}. (Mock)`);
    };

    const handleAddCategoryToProduct = (productId) => {
        const product = products.find(p => p._id === productId);
        if (!product) {
            alert("Product not found!");
            return;
        }

        const categoryNameInput = prompt("Enter the name of the category to add to this product:");

        if (categoryNameInput === null || categoryNameInput.trim() === "") {
            return;
        }

        const categoryNameTrimmed = categoryNameInput.trim().toLowerCase();

        const categoryToAdd = allCategories.find(
            availCat => availCat.name.toLowerCase() === categoryNameTrimmed
        );

        if (!categoryToAdd) {
            alert(`Category "${categoryNameInput}" not found`);
            return;
        }

        const productHasCategory = product.categories.some(cat => {
            const catId = typeof cat === 'object' ? cat._id ?? cat.id : cat;
            return catId === (categoryToAdd._id ?? categoryToAdd.id);
        });

        if (productHasCategory) {
            alert(`Product "${product.name}" already has the category "${categoryToAdd.name}".`);
            return;
        }

        setProducts(prevProducts =>
            prevProducts.map(p => {
                if (p._id === productId) {
                    return {
                        ...p,
                        categories: [...p.categories, { _id: categoryToAdd._id ?? categoryToAdd.id, name: categoryToAdd.name }],
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
                prev.map(p => (p._id === productId ? { ...p, stock: p.stock + amount } : p))
            );
            alert(`${amount} added to stock for product ${productId}. (Mock)`);
        } else if (amount <= 0) {
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
                            key={product._id}
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

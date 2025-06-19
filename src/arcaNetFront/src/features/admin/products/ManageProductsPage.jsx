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
            const matchesHighlightFilter = showHighlightedOnly ? product.highlighted : true;
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

    const handleToggleHighlight = async (productId, newHighlightState) => {
        try {
            const productToUpdate = products.find(p => p._id === productId);
            const response = await fetch(`http://localhost:3000/product/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...productToUpdate, highlighted: newHighlightState }),
            });

            if (!response.ok) throw new Error('Failed to update highlight.');

            setProducts(prev =>
                prev.map(p => (p._id === productId ? { ...p, highlighted: newHighlightState } : p))
            );
        } catch (err) {
            console.error('Error updating highlight:', err);
            alert('Could not update highlight.');
        }
    };


    const handleRemoveCategoryFromProduct = async (productId, categoryIdToRemove) => {
        const product = products.find(p => p._id === productId);
        if (!product) return alert('Product not found.');

        const updatedCategories = product.categories.filter(cat => {
            const catId = typeof cat === 'object' ? cat._id ?? cat.id : cat;
            return catId !== categoryIdToRemove;
        });

        try {
            const response = await fetch(`http://localhost:3000/product/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...product, categories: updatedCategories }),
            });

            if (!response.ok) throw new Error('Failed to update categories.');

            setProducts(prev =>
                prev.map(p => (p._id === productId ? { ...p, categories: updatedCategories } : p))
            );
            alert('Category removed successfully.');
        } catch (err) {
            console.error('Error removing category:', err);
            alert('Could not remove category.');
        }
    };

    const handleAddCategoryToProduct = async (productId) => {
        const product = products.find(p => p._id === productId);
        if (!product) return alert('Product not found!');

        const categoryNameInput = prompt("Enter the name of the category to add to this product:");
        if (!categoryNameInput?.trim()) return;

        const categoryNameTrimmed = categoryNameInput.trim().toLowerCase();

        const categoryToAdd = allCategories.find(
            availCat => availCat.name.toLowerCase() === categoryNameTrimmed
        );
        if (!categoryToAdd) return alert(`Category "${categoryNameInput}" not found`);

        const productHasCategory = product.categories.some(cat => {
            const catId = typeof cat === 'object' ? cat._id ?? cat.id : cat;
            return catId === (categoryToAdd._id ?? categoryToAdd.id);
        });
        if (productHasCategory) {
            return alert(`Product already has the category "${categoryToAdd.name}".`);
        }

        const updatedCategories = [
            ...product.categories,
            { _id: categoryToAdd._id, name: categoryToAdd.name }
        ];

        try {
            const response = await fetch(`http://localhost:3000/product/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...product, categories: updatedCategories }),
            });

            if (!response.ok) throw new Error('Failed to update categories.');

            setProducts(prev =>
                prev.map(p => (p._id === productId ? { ...p, categories: updatedCategories } : p))
            );
            alert(`Category "${categoryToAdd.name}" added to product "${product.name}".`);
        } catch (err) {
            console.error('Error adding category:', err);
            alert('Could not add category.');
        }
    };

    const handleAddSupply = async (productId) => {
        const amount = parseInt(prompt("Enter quantity to add to stock:", "1"), 10);
        if (isNaN(amount) || amount <= 0) {
            return alert("Please enter a positive number.");
        }

        const product = products.find(p => p._id === productId);
        if (!product) return alert("Product not found!");

        const newStock = product.stock + amount;

        try {
            const response = await fetch(`http://localhost:3000/product/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...product, stock: newStock }),
            });

            if (!response.ok) throw new Error('Failed to update stock.');

            setProducts(prev =>
                prev.map(p => (p._id === productId ? { ...p, stock: newStock } : p))
            );
            alert(`${amount} added to stock for product ${productId}.`);
        } catch (err) {
            console.error('Error updating stock:', err);
            alert('Could not update stock.');
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

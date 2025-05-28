import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button'; // Ajuste o caminho se necessário
import styles from '../AdminForm.module.css'; // Reutilizando o CSS de formulário de admin

const AddProductPage = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(''); // 'Amount' no mockup, mas 'stock' é mais comum
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Para URL da imagem
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]); // Array de IDs de categorias selecionadas
    
    const [availableCategories, setAvailableCategories] = useState([]);

    // Carregar categorias disponíveis do localStorage (ou mock)
    useEffect(() => {
        try {
            const storedCategories = localStorage.getItem('adminCategories');
            if (storedCategories) {
                setAvailableCategories(JSON.parse(storedCategories).filter(cat => cat.status === 'Active'));
            } else {
                // Fallback se não houver categorias no localStorage (idealmente, você teria um mock aqui)
                setAvailableCategories([
                    { id: 1, name: 'Indie', status: 'Active' },
                    { id: 2, name: 'Classic', status: 'Active' },
                    { id: 3, name: 'Oracle', status: 'Active' },
                ]);
            }
        } catch (error) {
            console.error("Error loading categories from localStorage:", error);
            // Definir um fallback em caso de erro
             setAvailableCategories([
                { id: 1, name: 'Indie', status: 'Active' },
                { id: 2, name: 'Classic', status: 'Active' },
             ]);
        }
    }, []);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter(id => id !== categoryId)
                : [...prevSelected, categoryId]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!productName.trim() || !price || !stock || !description.trim()) {
            alert('Please fill in all required fields: Name, Price, Amount (Stock), and Description.');
            return;
        }
        if (isNaN(parseFloat(price)) || isNaN(parseInt(stock, 10))) {
            alert('Price and Amount (Stock) must be valid numbers.');
            return;
        }

        // Mapear IDs de categorias selecionadas para objetos {id, name}
        const categoriesForProduct = selectedCategories.map(id => {
            const foundCat = availableCategories.find(cat => cat.id === id);
            return foundCat ? { id: foundCat.id, name: foundCat.name } : null;
        }).filter(cat => cat !== null);


        const newProduct = {
            id: `prod_${Date.now()}`, // ID mockado simples
            name: productName,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            description: description,
            photo: imageUrl || 'https://via.placeholder.com/150?text=No+Image', // Placeholder se URL vazia
            isHighlighted: isHighlighted,
            categories: categoriesForProduct,
        };

        try {
            const storedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
            storedProducts.push(newProduct);
            localStorage.setItem('adminProducts', JSON.stringify(storedProducts));
            alert(`Product "${productName}" added successfully!`);
            navigate('/admin/products'); // Navegar de volta para a lista de produtos
        } catch (error) {
            console.error("Error saving product to localStorage:", error);
            alert("Failed to save product. See console for details.");
        }
    };

    return (
        <div className={styles.adminFormPage}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Add New Product</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="productName">Product Name *</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price">Price ($) *</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="stock">Amount (Stock) *</label>
                    <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                        min="0"
                        step="1"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Categories</label>
                    <div className={styles.checkboxGroup}> {/* Você precisará de estilos para checkboxGroup */}
                        {availableCategories.map(category => (
                            <label key={category.id} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    value={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="4"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={isHighlighted}
                            onChange={(e) => setIsHighlighted(e.target.checked)}
                        />
                        Highlight this product?
                    </label>
                </div>

                <div className={styles.formActions}>
                    <Button type="button" onClick={() => navigate('/admin/products')} variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Add Product
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
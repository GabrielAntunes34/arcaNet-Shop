import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import styles from '../AdminForm.module.css';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  // Fetch active categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/category', {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const result = await response.json();
        const filtered = (result.data || []).filter((cat) => cat.status === 'Active');
        setAvailableCategories(filtered);
      } catch (error) {
        console.error('Error loading categories from API:', error);
        setAvailableCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Toggle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  // Submit new product
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productName.trim() || !price || !stock || !description.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const priceNumber = parseFloat(price);
    const stockNumber = parseInt(stock, 10);

    if (isNaN(priceNumber) || isNaN(stockNumber)) {
      alert('Price and stock must be valid numbers.');
      return;
    }

    const newProduct = {
      name: productName,
      price: priceNumber,
      stock: stockNumber,
      sold: 0, // Default value for new products
      description,
      photo: imageUrl || 'https://via.placeholder.com/150?text=No+Image',
      isHighlighted,
      categories: selectedCategories, // Category IDs
    };

    try {
      const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error('Failed to add product.');

      alert(`Product "${productName}" added successfully!`);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to add product. See console for details.');
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
          <div className={styles.checkboxGroup}>
            {availableCategories.map((cat) => (
              <label key={cat._id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={cat._id}
                  checked={selectedCategories.includes(cat._id)}
                  onChange={() => handleCategoryChange(cat._id)}
                />
                {cat.name}
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
            style={{ resize: 'none' }}
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
          <Button type="button" onClick={() => navigate('/admin/products')} variant="classic">
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

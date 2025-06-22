import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import styles from '../AdminForm.module.css';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('Active'); // Default status
  const navigate = useNavigate();

  // Submit new category
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!categoryName.trim()) {
      alert('Category name cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: categoryName.trim(),
          status,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.message || 'Failed to add category.');
      }

      alert(`Category "${categoryName}" (Status: ${status}) added successfully!`);
      navigate('/admin/categories');
    } catch (error) {
      console.error('Error adding category:', error);
      alert(`Failed to add category. ${error.message}`);
    }
  };

  return (
    <div className={styles.adminFormPage}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Add New Category</h2>

        <div className={styles.formGroup}>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoryStatus">Status:</label>
          <select
            id="categoryStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.select}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <Button
            type="button"
            onClick={() => navigate('/admin/categories')}
            variant="classic"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;

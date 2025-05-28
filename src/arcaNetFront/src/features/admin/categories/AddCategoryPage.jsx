import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button'; // Ajuste o caminho se necessário
import styles from '../AdminForm.module.css'; // Podemos criar um CSS Module genérico para formulários de admin ou um específico

const AddCategoryPage = () => {
    const [categoryName, setCategoryName] = useState('');
    const [status, setStatus] = useState('Active'); // Default status
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!categoryName.trim()) {
            alert('Category name cannot be empty.');
            return;
        }

        const newCategory = {
            id: Date.now(), // ID mockado simples
            name: categoryName,
            status: status,
        };

        // Adicionar ao localStorage (mesma lógica da sugestão anterior)
        try {
            const storedCategories = JSON.parse(localStorage.getItem('adminCategories') || '[]');
            storedCategories.push(newCategory);
            localStorage.setItem('adminCategories', JSON.stringify(storedCategories));
            alert(`Category "${categoryName}" (Status: ${status}) added successfully!`);
            navigate('/admin/categories'); // Navegar de volta para a lista
        } catch (error) {
            console.error("Error saving category to localStorage:", error);
            alert("Failed to save category. See console for details.");
        }
    };

    return (
        <div className={styles.adminFormPage}> {/* Classe para a página inteira */}
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
                    <Button type="button" onClick={() => navigate('/admin/categories')} variant="secondary">
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
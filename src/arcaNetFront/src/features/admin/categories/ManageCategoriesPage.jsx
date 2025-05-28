import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar/SearchBar'; // Ajuste o caminho se necessário
import Button from '../../../components/Button/Button';       // Ajuste o caminho se necessário
import styles from './ManageCategoriesPage.module.css';     // Vamos criar este CSS Module
import { defaultInitialProducts, defaultInitialCategories } from '../../mockData.jsx'; 

const ManageCategoriesPage = () => {
    const [categories, setCategories] = useState(
        () => {
            try {
                const storedCategories = localStorage.getItem('adminCategories');
                return storedCategories ? JSON.parse(storedCategories) : defaultInitialCategories;
            } catch (error) {
                console.error("Error reading categories from localStorage:", error);
                return defaultInitialCategories;
            }
        }
    );
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Lógica para filtrar categorias baseado no searchTerm
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        try {
            localStorage.setItem('adminCategories', JSON.stringify(categories));
        } catch (error) {
            console.error("Error saving categories to localStorage:", error);
        }
    }, [categories]);

    const handleAddCategory = () => {
        // Navegar para a página de criação de categoria
        // A rota genérica que você tem é /admin/create/:entity
        navigate('/admin/categories/add');
    };

    const handleDeleteCategory = (categoryId) => {
        // Lógica para deletar (mock)
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
            // No futuro: chamar API para deletar
        }
    };

    const handleStatusChange = (categoryId, newStatus) => {
        // Lógica para mudar status (mock)
        setCategories(prevCategories =>
            prevCategories.map(cat =>
                cat.id === categoryId ? { ...cat, status: newStatus } : cat
            )
        );
        // No futuro: chamar API para atualizar status
    };

    return (
        <div className={styles.manageCategoriesPage}>
            <header className={styles.header}>
                <h1>Manage Categories</h1>
                <p>Add, edit, or remove tarot and supplies categories.</p>
            </header>

            <div className={styles.controls}>
                <SearchBar
                    onSearch={setSearchTerm}
                    placeholder="Search categories..."
                />
                <Button onClick={handleAddCategory} variant="primary">
                    Add Category
                </Button>
            </div>

            <div className={styles.categoryList}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map(category => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <select
                                            value={category.status}
                                            onChange={(e) => handleStatusChange(category.id, e.target.value)}
                                            className={styles.statusSelect}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            variant="danger"
                                            size="small" // Supondo que seu Button aceite 'size'
                                        >
                                            Delete
                                        </Button>
                                        {/* Botão de Editar pode ser adicionado aqui no futuro */}
                                        {/* <Button onClick={() => navigate(`/admin/update/category/${category.id}`)} variant="secondary" size="small">Edit</Button> */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCategoriesPage;
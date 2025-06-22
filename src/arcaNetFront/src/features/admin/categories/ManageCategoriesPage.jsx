import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Button from '../../../components/Button/Button';
import styles from './ManageCategoriesPage.module.css';

const ManageCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch of the Database
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/category', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const result = await response.json();
                setCategories(Array.isArray(result.data) ? result.data : []);
            } catch (error) {
                console.error('Error fetching categories from API:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddCategory = () => {
        navigate('/admin/categories/add');
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            const res = await fetch(`http://localhost:3000/category/${categoryId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to delete category');
            }

            setCategories(prev => prev.filter(cat => cat._id !== categoryId));
        } catch (err) {
            console.error('Error deleting category:', err);
            alert('Failed to delete category.');
        }
    };

    const handleStatusChange = async (categoryId, newStatus) => {
        try {
            const category = categories.find(cat => cat._id === categoryId);
            if (!category) {
                console.error('Category not found:', categoryId);
                return;
            }
            const res = await fetch(`http://localhost:3000/category/${categoryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...category, status: newStatus }),
            });

            if (!res.ok) {
                throw new Error('Failed to update category status');
            }

            setCategories(prev =>
                prev.map(cat =>
                    cat._id === categoryId ? { ...cat, status: newStatus } : cat
                )
            );
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update category status.');
        }
    };

    if (loading) {
        return (
            <div className={styles.manageCategoriesPage}>
                <header className={styles.header}>
                    <h1>Manage Categories</h1>
                    <p>Loading categories...</p>
                </header>
            </div>
        );
    }

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
                                <tr key={category._id}>
                                    <td>{category._id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <select
                                            value={category.status}
                                            onChange={(e) =>
                                                handleStatusChange(category._id, e.target.value)
                                            }
                                            className={styles.statusSelect}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => handleDeleteCategory(category._id)}
                                            variant="danger"
                                            size="small"
                                        >
                                            Delete
                                        </Button>
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

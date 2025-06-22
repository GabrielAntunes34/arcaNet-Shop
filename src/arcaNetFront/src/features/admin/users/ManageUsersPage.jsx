import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Button from '../../../components/Button/Button';
import styles from './ManageUsersPage.module.css';

const ManageUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const result = await response.json();
                const data = result.data;

                setUsers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching users from API:', error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`http://localhost:3000/user/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user.');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const userToUpdate = users.find(u => u._id === userId);
            if (!userToUpdate) return;

            const response = await fetch(`http://localhost:3000/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ ...userToUpdate, role: newRole }),
            });

            if (!response.ok) throw new Error('Failed to update user');

            const result = await response.json();
            const updatedUser = result.data;

            setUsers(prev =>
                prev.map(user =>
                    user._id === userId ? updatedUser : user
                )
            );
        } catch (err) {
            console.error('Error updating user:', err);
            alert('Failed to update user.');
        }
    };

    // Conta quantos admins existem
    const adminCount = users.filter(u => u.role === 'admin').length;

    if (loading) {
        return (
            <div className={styles.manageUsersPage}>
                <header className={styles.header}>
                    <h1>Manage Users</h1>
                    <p>Loading users...</p>
                </header>
            </div>
        );
    }

    return (
        <div className={styles.manageUsersPage}>
            <header className={styles.header}>
                <h1>Manage Users</h1>
                <p>View, edit roles, or remove users from the system.</p>
            </header>

            <div className={styles.controls}>
                <SearchBar
                    onSearch={setSearchTerm}
                    placeholder="Search users by name or email..."
                />
                {/* Futuro botão de adicionar usuário */}
                {/* <Button onClick={() => navigate('/admin/users/add')} variant="primary">Add User</Button> */}
            </div>

            <div className={styles.userList}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => {
                                const isLastAdmin = user.role === 'admin' && adminCount === 1;
                                return (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={styles.roleSelect}
                                                disabled={isLastAdmin}
                                            >
                                                <option value="client" disabled={isLastAdmin}>Client</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => handleDeleteUser(user._id)}
                                                variant="danger"
                                                size="small"
                                                disabled={isLastAdmin}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsersPage;

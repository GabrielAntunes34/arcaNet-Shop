import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar/SearchBar'; 
import Button from '../../../components/Button/Button';         
import styles from './ManageUsersPage.module.css';           
import { defaultInitialUsers } from '../../../tests/mockData'; 

const ManageUsersPage = () => {
    const [users, setUsers] = useState(() => {
        try {
            const storedUsers = localStorage.getItem('adminUsers');
            const parsed = storedUsers ? JSON.parse(storedUsers) : null;
            return (parsed && parsed.length > 0) ? parsed : defaultInitialUsers;
        } catch (error) {
            console.error("Error reading users from localStorage:", error);
            return defaultInitialUsers;
        }
    });
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            localStorage.setItem('adminUsers', JSON.stringify(users));
        } catch (error) {
            console.error("Error saving users to localStorage:", error);
        }
    }, [users]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteUser = (userId) => {
        // Não permitir deletar o próprio usuário logado (lógica futura)
        // ou o admin padrão se for uma conta crítica.
        // Por enquanto, apenas um confirm.
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            // No futuro: chamar API para deletar
        }
    };

    const handleRoleChange = (userId, newRole) => {
        // Lógica para não permitir rebaixar o último admin (lógica futura)
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
        // No futuro: chamar API para atualizar role
    };

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
                {/* O botão de adicionar usuário pode ser implementado depois */}
                {/* <Button onClick={handleAddUser} variant="primary">
                    Add User
                </Button> */}
            </div>

            <div className={styles.userList}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.avatarColumn}>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td className={styles.avatarColumn}>
                                        <img src={user.avatar} className={styles.avatarImage} />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className={styles.roleSelect}
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => handleDeleteUser(user.id)}
                                            variant="danger"
                                            size="small"
                                            // disabled={user.email === 'admin@admin.com'} // Exemplo
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsersPage;
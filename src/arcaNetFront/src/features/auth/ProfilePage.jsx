import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './AuthPages.css';
import validateData from './authValidation';

// This component is accessible to all users, showing it's data and making them able to alter
// Some of it's fields

const ProfilePage = () => {
  // Declaring the states of this page
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  // Changhing the formdata as the user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        address: user.address || '',
        phone: user.phone || '',
        email: user.email || '',
        password: '********', // password shouldn't be diplayed
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrors(null);

    // Verifying if all data is curretly set
    const newErrors = validateData(formData, false)
    setErrors(newErrors);

    try {
      // Simulating an user update
      if(errors === null) {
        const updatedUser = {
          ...user,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
        };

        // Updating at userContext, and consequently in the localstorage.
        setUser(updatedUser);
        setMessage('Profile successfully updated!');
      }
    } catch (err) {
      console.log('An error occurred');
    }
  };

  return (
    <>
      <h2>Perfil do Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Endereço</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label htmlFor="phone">Telefone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <ErrorMessage message={errors && errors.phone}/>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          disabled
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          disabled
        />

        <button className='form-btn' type="submit" >Salvar alterações</button>

        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default ProfilePage;

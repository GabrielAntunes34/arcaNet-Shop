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
        address: user.address === '$' ? '' : (user.address || ''),
        phone: user.phone === '$' ? '' : (user.phone || ''),
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

    const newErrors = validateData(formData, false);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`http://localhost:3000/user/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          address: formData.address.trim() === '' ? '$' : formData.address,
          phone: formData.phone.trim() === '' ? '$' : formData.phone
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUser(prev => ({
        ...prev,
        ...data.data // update user with server return
      }));
      setMessage('Profile updated!');
    } catch (err) {
      console.error('Error while updating profile:', err.message);
      setMessage('Error while trying to update profile, try again later');
    }
  };

  return (
    <>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={{resize: 'none'}}
        />
        <ErrorMessage message={errors && errors.address}/>

        <label htmlFor="phone">Phone number</label>
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

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          disabled
        />

        <button className='form-btn' type="submit" >Save changes</button>

        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default ProfilePage;

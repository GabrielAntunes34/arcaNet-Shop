// src/features/auth/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import validateData from './authValidation';
import api from '../../services/api';                 // ← IMPORTANTE
import './AuthPages.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors]   = useState({});
  const [message, setMessage] = useState(null);

  /* -------------------------------------------------- */
  /* Carrega dados atuais do usuário                    */
  /* -------------------------------------------------- */
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name:  user.name  || '',
        address: user.address || '',
        phone: user.phone || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
    }
  }, [user]);

  /* -------------------------------------------------- */
  /* Handlers                                           */
  /* -------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);

    /* ---------- Validação básica (nome/telefone) ------ */
    const frontErrs = validateData(formData, false);
    /* ---------- Validação de senha nova --------------- */
    const pwRegex = /^(?=.*[^A-Za-z0-9])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (formData.newPassword || formData.confirmNewPassword) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        frontErrs.confirmNewPassword = 'Passwords do not match.';
      } else if (!pwRegex.test(formData.newPassword)) {
        frontErrs.newPassword = 'Password needs 6+ chars, symbol, number, upper & lower case.';
      }
    }

    if (Object.keys(frontErrs).length > 0) {
      setErrors(frontErrs);
      return;
    }

    /* ---------- Envio ao backend ---------------------- */
    try {
      const body = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
      };

      if (formData.newPassword) {
        body.currentPassword = formData.currentPassword;
        body.newPassword     = formData.newPassword;
      }

      const { data } = await api.patch('/users/me', body);   //  <-- ponto 4
      setUser(data.user);
      setMessage('Profile successfully updated!');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error updating profile';
      setErrors({ api: msg });
    }
  };

  /* -------------------------------------------------- */
  /* Render                                             */
  /* -------------------------------------------------- */
  return (
    <>
      <h2>User Profile</h2>
      {errors.api && <ErrorMessage message={errors.api} />}

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} />

        <label>Phone</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
        <ErrorMessage message={errors.phone} />

        <label>Email</label>
        <input type="email" value={formData.email} disabled />

        {/* ----- Password change ----- */}
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Only if changing password"
        />

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
        />
        <ErrorMessage message={errors.newPassword} />
        <ErrorMessage message={errors.confirmNewPassword} />

        <button className="form-btn" type="submit">
          Save changes
        </button>

        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default ProfilePage;

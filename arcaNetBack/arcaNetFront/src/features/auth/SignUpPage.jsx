// src/features/auth/SignUpPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import validateData from './authValidation';
import './AuthPages.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    address: '',
    phone: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // Atualiza campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    // Validações de front-end
    const newErrors = validateData(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      await register(formData);     // Já loga e salva token
      navigate('/');                // Redireciona depois do cadastro
    } catch (err) {
      console.error(err);
      const apiError = err.response?.data?.message;
      setErrors({ api: apiError || 'Registration failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Sign up</h1>

      {errors?.api && <ErrorMessage message={errors.api} />}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          placeholder="Djavan Moreno"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <ErrorMessage message={errors?.email} />

        <label htmlFor="phone">Phone:</label>
        <input
          name="phone"
          type="text"
          placeholder="+55 (19) 99132-5324"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <ErrorMessage message={errors?.phone} />

        <label htmlFor="address">Address:</label>
        <textarea
          name="address"
          rows="4"
          value={formData.address}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <ErrorMessage message={errors?.password} />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <ErrorMessage message={errors?.confirmPassword} />

        <label htmlFor="role">Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <button className="form-btn" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default SignUpPage;

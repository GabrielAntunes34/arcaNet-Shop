import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './AuthPages.css';

/*
const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fafafa',
  },
  label: {
    display: 'block',
    marginTop: '1rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.25rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  inputDisabled: {
    backgroundColor: '#eee',
    color: '#777',
    cursor: 'not-allowed',
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.75rem',
    width: '100%',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  messageSuccess: {
    color: 'green',
    marginTop: '1rem',
  },
  messageError: {
    color: 'red',
    marginTop: '1rem',
  },
};
*/

const ProfilePage = () => {
  const { user, setUser } = useAuth(); // Assumindo que o AuthContext expõe setUser para atualizar localmente
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        address: user.address || '',
        phone: user.phone || '',
        email: user.email || '',
        password: '********', // mostra senha mascarada
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
    setError(null);

    try {
      // Aqui você faria a chamada para o backend para salvar as alterações,
      // Exemplo:
      // await api.updateUserProfile({ name, address, phone })

      // Simulando atualização local e sucesso
      const updatedUser = {
        ...user,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
      };

      setUser(updatedUser); // atualiza no contexto
      //localStorage.setItem('user', JSON.stringify(updatedUser)); // mantém localStorage sincronizado

      setMessage('Perfil atualizado com sucesso!');
    } catch (err) {
      setError('Falha ao atualizar o perfil. Tente novamente.');
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

        <ErrorMessage message={error}/>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default ProfilePage;

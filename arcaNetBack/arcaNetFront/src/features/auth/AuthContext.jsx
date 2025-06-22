// src/features/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from '../../services/api.js';

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/users/me')
        .then((res) => setUser(res.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });
      localStorage.setItem('token', data.token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (formData) => {
    const { data } = await api.post('/auth/register', formData);
    setUser({
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    localStorage.setItem('token', data.token);
  };

  return (
    <authContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };

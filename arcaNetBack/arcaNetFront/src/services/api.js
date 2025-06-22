// src/services/api.js
import axios from 'axios';

// Define a base URL vinda do .env ou fallback para localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor de requisição para enviar token no header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// (opcional) Interceptor de resposta para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized - talvez token expirado ou inválido');
      // Você pode redirecionar para login ou limpar token aqui, se quiser
    }
    return Promise.reject(error);
  }
);

export default api;

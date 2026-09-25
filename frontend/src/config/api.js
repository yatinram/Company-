import axios from 'axios';

const BASE_URL = 'https://aventrix-backend.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Request interceptor: attach JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aventrix_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 on protected admin routes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      window.location.pathname.startsWith('/admin')
    ) {
      localStorage.removeItem('aventrix_admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

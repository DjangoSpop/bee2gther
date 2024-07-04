import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (email, password) => api.post('/users/login/', { email, password });
export const register = (userData) => api.post('/users/register/', userData);
export const getUserProfile = () => api.get('/users/profile/');
export const updateUserProfile = (userData) => api.put('/users/profile/', userData);

export const getProducts = () => api.get('/products/');
export const getProductDetails = (id) => api.get(`/products/${id}/`);
export const createProduct = (productData) => api.post('/products/', productData);

export const getGroupBuys = () => api.get('/group-buys/');
export const getGroupBuyDetails = (id) => api.get(`/group-buys/${id}/`);
export const joinGroupBuy = (id, quantity) => api.post(`/group-buys/${id}/join/`, { quantity });

export const getCartItems = () => api.get('/cart/');
export const addToCart = (productId, quantity) => api.post('/cart/add/', { productId, quantity });
export const removeFromCart = (productId) => api.delete(`/cart/${productId}/`);

export default api;

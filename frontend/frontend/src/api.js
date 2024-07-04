import axios from 'axios';

const API_URL = ' http://127.0.0.1:8000/api/';

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

// User related API calls
export const login = (email, password) => api.post('/users/login/', { email, password });
export const register = (userData) => api.post('/users/register/', userData);
export const getUserProfile = () => api.get('/users/profile/');
export const updateUserProfile = (userData) => api.put('/users/profile/', userData);
export const logout = () => api.post('/users/logout/');

// Product related API calls
export const getProducts = () => api.get('/products/');
export const getProductDetails = (id) => api.get(`/products/${id}/`);
export const createProduct = (productData) => api.post('/products/', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}/`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}/`);

// Order related API calls
export const getOrders = () => api.get('/orders/');
export const getOrderDetails = (id) => api.get(`/orders/${id}/`);
export const createOrder = (orderData) => api.post('/orders/', orderData);
export const updateOrder = (id, orderData) => api.put(`/orders/${id}/`, orderData);

// Group Buy related API calls
export const getGroupBuys = () => api.get('/groupbuys/');
export const getGroupBuyDetails = (id) => api.get(`/groupbuys/${id}/`);
export const createGroupBuy = (groupBuyData) => api.post('/groupbuys/', groupBuyData);
export const joinGroupBuy = (id, participationData) => api.post(`/groupbuys/${id}/join/`, participationData);

export default api;

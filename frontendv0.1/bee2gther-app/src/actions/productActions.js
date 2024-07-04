// src/actions/productActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const { data } = await api.get('/products/');
  return data;
});

export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails', async (id) => {
  const { data } = await api.get(`/products/${id}/`);
  return data;
});

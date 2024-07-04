// src/actions/cartActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
  const { data } = await api.post('/cart/add/', product);
  return data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
  const { data } = await api.delete(`/cart/remove/${id}`);
  return data;
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const { data } = await api.get('/cart/');
  return data;
});

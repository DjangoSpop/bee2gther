// src/actions/orderActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (id) => {
  const { data } = await api.get(`/orders/${id}/`);
  return data;
});

export const payOrder = createAsyncThunk('orders/payOrder', async (id) => {
  const { data } = await api.put(`/orders/${id}/pay/`);
  return data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData) => {
  const { data } = await api.post('/orders/', orderData);
  return data;
});

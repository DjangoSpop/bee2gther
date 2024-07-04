// src/actions/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const login = createAsyncThunk('auth/login', async (userData) => {
  const { data } = await api.post('/users/login/', userData);
  return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await api.post('/users/logout/');
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const { data } = await api.post('/users/register/', userData);
  return data;
});

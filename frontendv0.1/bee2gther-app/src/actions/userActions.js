// src/actions/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/users/profile/');
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.put('/users/profile/', userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

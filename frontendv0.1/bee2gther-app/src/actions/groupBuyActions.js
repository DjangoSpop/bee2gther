// src/actions/groupBuyActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchGroupBuys = createAsyncThunk('groupBuys/fetchGroupBuys', async () => {
  const { data } = await api.get('/groupbuys/');
  return data;
});

export const createGroupBuy = createAsyncThunk('groupBuys/createGroupBuy', async (groupBuyData) => {
  const { data } = await api.post('/groupbuys/', groupBuyData);
  return data;
});

export const joinGroupBuy = createAsyncThunk('groupBuys/joinGroupBuy', async ({ groupBuyId, userId }) => {
  const { data } = await api.post(`/groupbuys/${groupBuyId}/join/`, { userId });
  return data;
});

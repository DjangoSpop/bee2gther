import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createGroupBuy = createAsyncThunk(
  'groupBuy/create',
  async (groupBuyData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/groupbuy', groupBuyData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const joinGroupBuy = createAsyncThunk(
  'groupBuy/join',
  async ({ groupBuyId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/groupbuy/${groupBuyId}/join`, { userId });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchGroupBuys = createAsyncThunk(
  'groupBuy/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/groupbuy');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const groupBuySlice = createSlice({
  name: 'groupBuy',
  initialState: {
    groupBuys: [],
    activeGroupBuy: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroupBuy.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroupBuy.fulfilled, (state, action) => {
        state.loading = false;
        state.groupBuys.push(action.payload);
        state.activeGroupBuy = action.payload;
      })
      .addCase(createGroupBuy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(joinGroupBuy.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinGroupBuy.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.groupBuys.findIndex(gb => gb._id === action.payload._id);
        if (index !== -1) {
          state.groupBuys[index] = action.payload;
        }
        state.activeGroupBuy = action.payload;
      })
      .addCase(joinGroupBuy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGroupBuys.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupBuys.fulfilled, (state, action) => {
        state.loading = false;
        state.groupBuys = action.payload;
      })
      .addCase(fetchGroupBuys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default groupBuySlice.reducer;

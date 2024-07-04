// src/reducers/groupBuyReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchGroupBuys, createGroupBuy, joinGroupBuy } from '../actions/groupBuyActions';

const groupBuySlice = createSlice({
  name: 'groupBuys',
  initialState: { groupBuys: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(createGroupBuy.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroupBuy.fulfilled, (state, action) => {
        state.loading = false;
        state.groupBuys.push(action.payload);
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
        const index = state.groupBuys.findIndex((gb) => gb._id === action.payload._id);
        if (index >= 0) {
          state.groupBuys[index] = action.payload;
        }
      })
      .addCase(joinGroupBuy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default groupBuySlice.reducer;

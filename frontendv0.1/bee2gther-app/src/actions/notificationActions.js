// src/actions/notificationActions.js
import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = '';
      state.type = '';
    },
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: []
  },
  reducers: {
    showNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    }
  }
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

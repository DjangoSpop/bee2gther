// src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from '../actions/authActions';

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export default authSlice.reducer;

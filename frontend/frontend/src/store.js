import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import groupBuyReducer from './slices/groupBuySlice';
import notificationReducer from './slices/notificationSlice';
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    groupBuy: groupBuyReducer,
    notification: notificationReducer,
  },
});

export default store;

// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import orderReducer from './reducers/orderReducer';
import groupBuyReducer from './reducers/groupBuyReducer';
import notificationReducer from './reducers/notificationReducer';
import cartReducer from './reducers/cartReducer';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productReducer,
    orders: orderReducer,
    groupBuys: groupBuyReducer,
    notification: notificationReducer,
    cart: cartReducer
  },
  preloadedState: {
    auth: { userInfo: userInfoFromStorage }
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

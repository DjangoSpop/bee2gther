// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';
import orderReducer from './reducers/orderReducer';
import groupBuyReducer from './reducers/groupBuyReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productReducer,
    orders: orderReducer,
    groupBuys: groupBuyReducer,
    notification: notificationReducer,
  },
});

export default store;

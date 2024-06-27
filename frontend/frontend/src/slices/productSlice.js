import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import *as productAPI from '../api/product';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      productAPI.getProducts((data) => {
        dispatch(setProducts(data));
        resolve(data);
      });
    });
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: { reviews: [] },
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const {setProducts} = productSlice.actions;
export default productSlice.reducer;

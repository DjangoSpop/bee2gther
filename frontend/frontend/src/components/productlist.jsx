import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productAPI from '../api/product';

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

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
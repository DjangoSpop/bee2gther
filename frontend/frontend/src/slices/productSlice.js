import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getProducts, createOrder} from '../api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
 async(_,{ rejectWithValue}) => {
  try {
    const response = await getProducts;
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
                  
 }
}
);

export const createNewOrder = createAsyncThunk(
  'products/createNewOrder',
  async(orderData, {rejectWithValue}) => {
    try {
      const response = await createOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    orderSuccess: false,
  },
  reducers: {
    clearOrderSuccess: (state) => {
      state.orderSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewOrder.fulfilled, (state) => {
        state.orderSuccess = true;
      });
  },
});

export const { clearOrderSuccess } = productSlice.actions;
export default productSlice.reducer;

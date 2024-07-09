import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from '../actions/productActions';

const initialState = {
  products: [],
  productDetails: {},
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
      case FETCH_PRODUCT_DETAILS_REQUEST:
      case ADD_PRODUCT_REQUEST:
          return { ...state, loading: true };
      case FETCH_PRODUCTS_SUCCESS:
          return { ...state, loading: false, products: action.payload };
      case FETCH_PRODUCT_DETAILS_SUCCESS:
          return { ...state, loading: false, productDetails: action.payload };
      case ADD_PRODUCT_SUCCESS:
          return { ...state, loading: false, products: [...state.products, action.payload] };
      case FETCH_PRODUCTS_FAILURE:
      case FETCH_PRODUCT_DETAILS_FAILURE:
      case ADD_PRODUCT_FAILURE:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};

export default productReducer;

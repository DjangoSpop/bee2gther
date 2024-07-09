import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_PRODUCT_DETAILS_REQUEST = 'FETCH_PRODUCT_DETAILS_REQUEST';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_FAILURE = 'FETCH_PRODUCT_DETAILS_FAILURE';
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

const API_URL = 'http://localhost:8000/api';

export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/products/`);
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const fetchProductDetails = (id) => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_DETAILS_REQUEST });
    try {
        const { data } = await axios.get(`${API_URL}/products/${id}/`);
        dispatch({ type: FETCH_PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_DETAILS_FAILURE, payload: error.message });
    }
};

export const addProduct = (product) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`${API_URL}/products/`, product, config);
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_PRODUCT_FAILURE, payload: error.message });
    }
};

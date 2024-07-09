import axios from 'axios';

export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const UPDATE_CART_ITEM_QUANTITY = 'UPDATE_CART_ITEM_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

const API_URL = 'http://localhost:8000/api';

export const getCartItems = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${API_URL}/cart/`, config);
        dispatch({
            type: GET_CART_ITEMS,
            payload: data,
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
};

export const addToCart = (productId, quantity) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.post(`${API_URL}/cart/add/`, { productId, quantity }, config);
        dispatch({
            type: ADD_TO_CART,
            payload: data,
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};

export const removeFromCart = (itemId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(`${API_URL}/cart/${itemId}/`, config);
        dispatch({
            type: REMOVE_ITEM_FROM_CART,
            payload: itemId,
        });
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};

export const updateCartItemQuantity = (itemId, quantity) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`${API_URL}/cart/${itemId}/`, { quantity }, config);
        dispatch({
            type: UPDATE_CART_ITEM_QUANTITY,
            payload: data,
        });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
    }
};

export const clearCart = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.delete(`${API_URL}/cart/clear/`, config);
        dispatch({
            type: CLEAR_CART,
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
};

export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : null;
    } catch (error) {
        console.error('Error loading cart from local storage:', error);
        return null;
    }
};

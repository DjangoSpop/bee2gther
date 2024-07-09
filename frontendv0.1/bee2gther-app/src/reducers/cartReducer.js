import {
    GET_CART_ITEMS,
    ADD_TO_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART,
} from '../actions/cartsActions';

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload),
            };
        case UPDATE_CART_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};

export default cartReducer;

import {
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CLEAR_CART,
} from './cartActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_CART_ITEMS:
          return {
              ...state,
              items: action.payload,
              loading: false,
          };
      case ADD_TO_CART:
          return {
              ...state,
              items: [...state.items, action.payload],
          };
      case REMOVE_ITEM_FROM_CART:
          return {
              ...state,
              items: state.items.filter(item => item.id !== action.payload),
          };
      case UPDATE_CART_ITEM_QUANTITY:
          return {
              ...state,
              items: state.items.map(item =>
                  item.id === action.payload.id ? action.payload : item
              ),
          };
      case CLEAR_CART:
          return {
              ...state,
              items: [],
          };
      default:
          return state;
  }
};

export default cartReducer;

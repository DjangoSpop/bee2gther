import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
  } from '../actions/categoryActions';
  
  const initialState = {
    loading: false,
    categories: [],
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CATEGORIES_SUCCESS:
        return { loading: false, categories: action.payload, error: null };
      case FETCH_CATEGORIES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default categoryReducer;

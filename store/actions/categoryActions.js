import axios from 'axios';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });

  try {
    const response = await axios.get('/api/categories');  // Adjust this URL to match your Django API endpoint
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message });
  }
};

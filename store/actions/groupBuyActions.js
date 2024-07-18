// store/actions/groupBuyActions.js
import axios from 'axios';

export const FETCH_GROUP_BUYS_REQUEST = 'FETCH_GROUP_BUYS_REQUEST';
export const FETCH_GROUP_BUYS_SUCCESS = 'FETCH_GROUP_BUYS_SUCCESS';
export const FETCH_GROUP_BUYS_FAILURE = 'FETCH_GROUP_BUYS_FAILURE';

export const fetchGroupBuys = () => async (dispatch) => {
  dispatch({ type: FETCH_GROUP_BUYS_REQUEST });

  try {
    const response = await axios.get('/api/group-buys');
    dispatch({ type: FETCH_GROUP_BUYS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_GROUP_BUYS_FAILURE, payload: error.message });
  }
};

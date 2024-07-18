import {
  FETCH_GROUP_BUYS_REQUEST,
  FETCH_GROUP_BUYS_SUCCESS,
  FETCH_GROUP_BUYS_FAILURE,
} from '../actions/groupBuyActions';

const initialState = {
  loading: false,
  groupBuys: [],
  error: null,
};

const groupBuyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP_BUYS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_GROUP_BUYS_SUCCESS:
      return {
        loading: false,
        groupBuys: action.payload,
        error: null,
      };
    case FETCH_GROUP_BUYS_FAILURE:
      return {
        loading: false,
        groupBuys: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default groupBuyReducer;

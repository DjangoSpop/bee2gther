import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import groupBuyReducer from './reducers/GroupBuyReducer';
import categoryReducer from './reducers/categoryReducer';
const rootReducer = combineReducers({
  groupBuys: groupBuyReducer,
  categories: categoryReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

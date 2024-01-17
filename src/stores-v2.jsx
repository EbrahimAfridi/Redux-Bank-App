import {applyMiddleware, combineReducers, createStore} from "redux";
import {thunk} from 'redux-thunk'
import accountReducer from "./features/accounts/accountSlice.jsx";
import customerReducer from "./features/customers/customerSlice.jsx";
import {composeWithDevTools} from "redux-devtools-extension";

// reducers are not allowed to change states
// or asynchronous operations or any effects, but we must wrap as much as possible logic into them
// Creating redux store

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
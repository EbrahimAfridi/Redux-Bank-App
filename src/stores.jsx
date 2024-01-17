import accountReducer from "./features/accounts/accountSlice.jsx";
import customerReducer from "./features/customers/customerSlice.jsx";
import {configureStore} from "@reduxjs/toolkit";

// reducers are not allowed to change states
// or asynchronous operations or any effects, but we must wrap as much as possible logic into them
// Creating redux store

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
})
export default store;
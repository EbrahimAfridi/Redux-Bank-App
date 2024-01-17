import {combineReducers, createStore} from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

// reducers are not allowed to change states
// or asynchronous operations or any effects, but we must wrap as much as possible logic into them
function accountReducer(state = initialStateAccount, action) {

  switch (action.type){
    case "account/deposit":
      return {...state, balance:  state.balance + action.payload};

    case "account/withdraw":
      return {...state, balance:  state.balance - action.payload};

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:  //state = initialState here
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action){
  switch (action.type){
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      }

    default:
      return state;
  }
}

// Creating redux store
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// Calling dispatch functions
// store.dispatch({type: "account/deposit", payload: 500});
// console.log(store.getState());
//
// store.dispatch({type: "account/withdraw", payload: 300});
// console.log(store.getState());
//
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 1000,
//     purpose: "To buy a laptop"
//   }
// });
// console.log(store.getState());
//
// //No payload here because of the logic written in reducer
// store.dispatch({type: "account/payLoan"});
// console.log(store.getState());


// Creating action creator
function deposit(amount){
  return {type: "account/deposit", payload: amount};
}
function withdraw(amount){
  return {type: "account/withdraw", payload: amount};
}
function requestLoan(amount, purpose){
  return {
    type: "account/requestLoan",
    payload: {
      amount: 1000,
      purpose: "To buy a laptop"
    }
  };
}
function payLoan(){
  return {type: "account/payLoan"};
}

function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/createCustomer',
    payload: {fullName, nationalId, createdAt: new Date().toISOString()},
  };
}

function updateName(fullName){
  return {
    type: "customer/updateName",
    payload: fullName,
  }
}


// store.dispatch(deposit(1000));
// console.log(store.getState());
// store.dispatch(withdraw(200));
// console.log(store.getState());
// store.dispatch(requestLoan(1000, "To buy laptop"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

store.dispatch(createCustomer("Ebrahim Afridi", "12"));
console.log(store.getState());




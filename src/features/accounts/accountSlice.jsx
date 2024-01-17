import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action){
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action){
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      // using a prepare method to give payload multiple values as RTK doesn't allow
      // more than one argument.
      prepare(amount, purpose){
          return{
            payload: { amount, purpose },
          };
      },

      // Now payload is an object with multiple values
      reducer(state, action){
        if (state.loan > 0) return;  // No need to return old state just return from the function and Already have loan no more loan allowed

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action){
      // note: we need to mutate balance before making loan 0 because otherwise balance - 0
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.purpose = "";
    },
    convertingCurrency(state){
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export function deposit(amount, currency){
  if (currency === "USD") return {type: "account/deposit", payload: amount};

  // Middleware code: If currency not USD this code is run and the
  // converted value is passed to the dispatcher i.e., store

  return async function (dispatch, getState) {
    dispatch({type: "account/convertingCurrency"})
    //API CALL
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    const converted = data.rates.USD;

    //RETURN ACTION
    dispatch({type: "account/deposit", payload: converted});
  };
}

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

export default accountSlice.reducer;

/*
function accountReducer(state = initialState, action) {

  switch (action.type){
    case "account/deposit":
      return {...state, balance:  state.balance + action.payload, isLoading: false};

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

    case "account/convertingCurrency":
      return {...state, isLoading: true};

    default:  //state = initialState here
      return state;
  }
}

// Creating action creator
export function deposit(amount, currency){
  if (currency === "USD") return {type: "account/deposit", payload: amount};

  // Middleware code: If currency not USD this code is run and the
  // converted value is passed to the dispatcher i.e., store

  return async function (dispatch, getState) {
    dispatch({type: "account/convertingCurrency"})
    //API CALL
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    const converted = data.rates.USD;

    //RETURN ACTION
    dispatch({type: "account/deposit", payload: converted});
  };
}
export function withdraw(amount){
  return {type: "account/withdraw", payload: amount};
}

export function requestLoan(amount, purpose){
  return {
    type: "account/requestLoan",
    payload: {
      amount: amount,
      purpose: purpose
    }
  };
}
export function payLoan(){
  return {type: "account/payLoan"};
}

export default accountReducer;

 */
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { FinanceReducer } from "./financeReducer";

const store = createStore(FinanceReducer, applyMiddleware(thunk));

export default store;

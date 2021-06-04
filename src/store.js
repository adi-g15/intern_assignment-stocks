// In this case, we may not require such complex setup, but aadat sa ho gya hai :p

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import appReducers from "./reducers";   // short for importing './reducers/index'
import { composeWithDevTools } from "redux-devtools-extension";

// taaki redux devtools use kar paye, as suggested by Redux docs
// eslint-disable-next-line no-undef
const storeEnhancers = process.env.NODE_ENV === "development" ? 
	composeWithDevTools(
		applyMiddleware( thunk )
	): applyMiddleware(thunk);

const store = createStore(appReducers, storeEnhancers);

export default store;

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { globalReducers } from "../reducers/index";

const composeEnhancers =
  ((window as any) && (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE) ||
  compose;
const reducer = combineReducers({
  global: globalReducers
});

export const configureStore = () =>
  createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

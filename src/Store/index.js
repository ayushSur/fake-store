import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
// Reducers
import AuthReducer from "./Reducers/Auth";
import ProductsReducer from "./Reducers/Products";
import UsersReducer from "./Reducers/Admin";
// Cutom middlewares
import { ApiMiddleware } from "./Middlewares/api";

const RootReducer = combineReducers({
  auth: AuthReducer,
  products: ProductsReducer,
  admin: UsersReducer,
});

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(ApiMiddleware, thunk))
);

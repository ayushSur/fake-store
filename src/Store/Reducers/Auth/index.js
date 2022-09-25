import {
  LOGIN_INIT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  TOGGLE_IS_ADMIN,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_ERROR,
} from "../../Actions/Auth";

export const initState = {
  userId: null,
  isAuth: -1,
  token: null,
  cart: [],
  authError: null,
  isAdmin: false,
  isAuthenticating: false,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return { ...state, isAuthenticating: true };

    case LOGIN_SUCCESS:
      const { token, isAdmin } = action.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          token,
          isAdmin: isAdmin !== undefined ? isAdmin : state.isAdmin,
        })
      );
      return {
        ...state,
        isAuth: 1,
        token,
        isAuthenticating: false,
        isAdmin: isAdmin !== undefined ? isAdmin : state.isAdmin,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        authError: action.data && action.data.msg,
        isAuth: 0,
        isAuthenticating: false,
      };

    case LOGOUT:
      return {
        ...state,
        isAuth: 0,
        userId: false,
        email: false,
        isAdmin: false,
      };

    case TOGGLE_IS_ADMIN:
      return { ...state, isAdmin: !state.isAdmin, error: null };

    case GET_CART_SUCCESS:
      return { ...state, cart: action.data };

    case GET_CART_FAIL:
      return { ...state, cart: [], error: action.data };

    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.data] };

    case REMOVE_FROM_CART:
      const updatedCart = [...state.cart];
      const toRemoveIndex = updatedCart.findIndex(
        (product) => parseInt(product.id) === parseInt(action.data.id)
      );
      updatedCart.splice(toRemoveIndex, 1);
      return { ...state, cart: updatedCart };

    case RESET_ERROR:
      return { ...state, authError: null };

    default:
      return { ...state };
  }
};

export default AuthReducer;

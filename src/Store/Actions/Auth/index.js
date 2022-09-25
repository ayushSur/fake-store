import { Api } from "../Api";

// Login
export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const RESET_ERROR = "RESET_ERROR";

export const login = (credentials) =>
  Api({
    url: "/auth/login",
    method: "POST",
    data: credentials,
    onInit: onLoginInit,
    onSuccess: onLoginSuccess,
    onFailure: onLoginFail,
  });
const onLoginInit = () => ({ type: LOGIN_INIT });
// API returns 200 success from failed login
// Therefore handling failed authentication also in onLoginSuccess
const onLoginSuccess = (data) => (dispatch) => {
  if (data.token) return dispatch({ type: LOGIN_SUCCESS, data });
  else setTimeout(() => dispatch({ type: RESET_ERROR }), 2000);
  dispatch(onLoginFail(data));
};
const onLoginFail = (error) => ({ type: LOGIN_FAIL, data: error });

//Logout
export const LOGOUT = "LOGOUT";
export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
  };
};

// isAdmin toogle
export const TOGGLE_IS_ADMIN = "TOGGLE_IS_ADMIN";
export const toogleIsAdmin = () => ({
  type: TOGGLE_IS_ADMIN,
});

// Get cart items
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAIL = "GET_CART_FAIL";

export const getcart = () =>
  Api({
    url: `/carts/user/1`,
    method: "GET",
    onSuccess: getcartSuccess,
    onFailure: getcartFailure,
  });
//Not using cart response from API, since I wanred it to have the imge as well
const getcartSuccess = (response) => ({
  type: GET_CART_SUCCESS,
  data: [
    {
      id: 3,
      title: "Mens Cotton Jacket",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    },
  ],
});
const getcartFailure = (error) => ({
  type: GET_CART_FAIL,
  data: error,
});

// Add and Delete cart items
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  data: product,
});
export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  data: product,
});

//check Authentication
export const checkAuth = () => (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) dispatch(onLoginSuccess(user));
  else dispatch(onLoginFail());
};

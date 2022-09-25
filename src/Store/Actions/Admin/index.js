import { Api } from "../Api";
const adminBaseURL = process.env.REACT_APP_ADMIN_URL;

// Get all users
export const GET_USERS_INIT = "GET_USERS_INIT";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export const getUsers = () =>
  Api({
    url: `${adminBaseURL}/`,
    method: "GET",
    data: { results: 50 },
    onInit: getUsersInit,
    onSuccess: getUsersSuccess,
    onFailure: getUsersFail,
  });
const getUsersInit = () => ({
  type: GET_USERS_INIT,
});
const getUsersSuccess = (response) => ({
  type: GET_USERS_SUCCESS,
  data: response,
});
const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  data: error,
});

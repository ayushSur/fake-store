import {
  GET_USERS_INIT,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../../Actions/Admin";

const initState = {
  userList: [],
  isLoading: false,
  error: null,
};

const USERSReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USERS_INIT:
      return { ...state, userList: [], isLoading: true, error: null };
    case GET_USERS_SUCCESS:
      return { ...state, userList: action.data.results, isLoading: false };
    case GET_USERS_FAIL:
      return { ...state, error: action.data, isLoading: false };
    default:
      return state;
  }
};

export default USERSReducer;

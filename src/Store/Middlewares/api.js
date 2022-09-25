import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const ApiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === "API") {
      const { url, method, data, onInit, onSuccess, onFailure } = action;

      const requestConfig = {
        url: url,
        method: method,
        [method === "GET" ? "params" : "data"]: data,
        headers: { "Access-Control-Allow-Origin": "*" },
      };

      if (onInit) dispatch(onInit());

      return axios
        .request(requestConfig)
        .then((res) => {
          if (onSuccess) dispatch(onSuccess(res.data));
          return res.data;
        })
        .catch((err) => {
          const error = err.response ? err.response.data : err.data;
          if (onFailure) dispatch(onFailure(error));
          return error;
        });
    }
    next(action);
  };

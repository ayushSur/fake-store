export const Api = ({
  url = "",
  method = "GET",
  data = null,
  onInit = null,
  onSuccess = null,
  onFailure = null,
}) => ({
  type: "API",
  url,
  method,
  data,
  onInit,
  onSuccess,
  onFailure,
});

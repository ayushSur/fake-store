import { Api } from "../Api";

// Get All Products
export const GET_PRODUCTS_INIT = "GET_PRODUCTS_INIT";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";

export const getProducts = (category) =>
  Api({
    url: category ? `/products/category/${category}` : "/products",
    method: "GET",
    onInit: getProductsInit,
    onSuccess: getProductsSuccess,
    onFailure: getProductsFailure,
  });
const getProductsInit = () => ({ type: GET_PRODUCTS_INIT });
const getProductsSuccess = (response) => ({
  type: GET_PRODUCTS_SUCCESS,
  data: response,
});
const getProductsFailure = (error) => ({
  type: GET_PRODUCTS_FAIL,
  data: error,
});

// Get All Categories
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAIL = "GET_CATEGORIES_FAIL";

export const getCategories = () =>
  Api({
    url: "/products/categories",
    method: "GET",
    onSuccess: getCategoriesSuccess,
    onFailure: getCategoriesFailure,
  });
const getCategoriesSuccess = (response) => ({
  type: GET_CATEGORIES_SUCCESS,
  data: response,
});
const getCategoriesFailure = (error) => ({
  type: GET_CATEGORIES_FAIL,
  data: error,
});

// Get Product by ID
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const GET_PRODUCT_BY_ID_FAIL = "GET_PRODUCT_BY_ID_FAIL";
export const getProductByID = (id) =>
  Api({
    url: `/products/${id}`,
    method: "GET",
    onSuccess: getProductByIDSuccess,
    onFailure: getProductByIDFailure,
  });
const getProductByIDSuccess = (response) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  data: response,
});
const getProductByIDFailure = (error) => ({
  type: GET_PRODUCT_BY_ID_FAIL,
  data: error,
});

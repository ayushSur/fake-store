import {
  GET_PRODUCTS_INIT,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
} from "../../Actions/Products";

export const initState = {
  productList: [],
  isLoading: false,
  categories: [],
  error: null,
};

const ProductsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_INIT:
      return { ...state, productList: [], isLoading: true, error: null };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, productList: action.data, isLoading: false };
    case GET_PRODUCTS_FAIL:
      return { ...state, error: action.data, isLoading: false };
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.data };
    case GET_CATEGORIES_FAIL:
      return { ...state, categories: [] };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, productList: [...state.productList, action.data] };
    case GET_PRODUCT_BY_ID_FAIL:
      return { ...state, error: action.data };
    default:
      return state;
  }
};

export default ProductsReducer;

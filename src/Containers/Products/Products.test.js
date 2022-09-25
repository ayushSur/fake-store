import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { initState as productsStore } from "../../Store/Reducers/Products";
import Products from ".";
import ProductCard from "../../Components/Products/ProductCard";
import {
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCTS_SUCCESS,
} from "../../Store/Actions/Products";
import mockAxios from "axios";
import { act } from "react-dom/test-utils";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { categories, products } from "../../MockData";

const store = window.mocks.mockStore({
  products: { ...productsStore, productList: products, categories: categories },
  auth: { isAdmin: false, cart: [] },
});

mockAxios.request = jest.fn().mockImplementation(({ url }) => {
  return new Promise((resolve) => resolve({ data: [] }));
});

describe("Products", () => {
  let wrapper;
  beforeAll(async () => {
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Products />
        </Provider>
      );
    });
    wrapper.update();
  });
  afterAll(() => wrapper.unmount());
  it("should render without fail", () => {
    shallow(
      <Provider store={store}>
        <Products />
      </Provider>
    );
  });
  it("Should getlist of products category on load", () => {
    expect(store.getActions()).toContainEqual({
      type: GET_CATEGORIES_SUCCESS,
      data: [],
    });
  });
  it("Should getlist of products on load", () => {
    expect(store.getActions()).toContainEqual({
      type: GET_PRODUCTS_SUCCESS,
      data: [],
    });
  });
  it("should render products cards", () => {
    expect(wrapper.find(ProductCard).length).toEqual(products.length);
  });
  it("Should handle filtering of products by category", async () => {
    mockAxios.request = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve) =>
        resolve({
          data: ["filteredProducts"],
        })
      );
    });
    await wrapper.find(Autocomplete).prop("onChange")({}, categories[0]);
    expect(store.getActions()).toContainEqual({
      type: GET_PRODUCTS_SUCCESS,
      data: ["filteredProducts"],
    });
  });

  it("Should handle clearing of filter", async () => {
    mockAxios.request = jest.fn().mockImplementationOnce(() => {
      return new Promise((resolve) =>
        resolve({
          data: ["allProducts"],
        })
      );
    });
    await wrapper.find(Autocomplete).prop("onChange")({}, "");
    expect(store.getActions()).toContainEqual({
      type: GET_PRODUCTS_SUCCESS,
      data: ["allProducts"],
    });
  });
});

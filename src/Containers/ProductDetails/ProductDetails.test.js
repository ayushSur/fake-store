import { Button, IconButton } from "@material-ui/core";
import { act } from "@testing-library/react";
import axios from "axios";
import { shallow, mount } from "enzyme";
import { pick } from "lodash";
import { Provider } from "react-redux";
import ProductDetails from ".";
import { products } from "../../MockData";
import { REMOVE_FROM_CART } from "../../Store/Actions/Auth";

const mockProductId = products[0].id;
const mockHistoryGoBack = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockImplementation(() => ({
    productId: mockProductId,
  })),
  useHistory: jest.fn().mockImplementation(() => ({
    goBack: mockHistoryGoBack,
  })),
}));

const store = window.mocks.mockStore({
  auth: { cart: [products[0]] },
  products: { productList: products },
});

describe("Product Details", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());
  it("Should render without fail", () => {
    shallow(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );
  });
  it("Should handle go back redirect", () => {
    wrapper.find(IconButton).simulate("click");
    expect(mockHistoryGoBack).toHaveBeenCalled();
  });
  it("Should handle remove from cart", () => {
    wrapper.find(Button).simulate("click");
    expect(store.getActions()).toContainEqual({
      type: REMOVE_FROM_CART,
      data: pick(products[0], ["id", "title", "image"]),
    });
  });
});

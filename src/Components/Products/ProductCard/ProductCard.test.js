import { Button, CardActionArea } from "@material-ui/core";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import ProductCard from ".";
import { products } from "../../../MockData";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../../Store/Actions/Auth";
import pick from "lodash/pick";

const props = {
  product: products[0],
};

const store = window.mocks.mockStore({
  auth: {
    cart: [],
  },
});

describe("ProductCard - with empty cart", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <ProductCard {...props} />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());
  it("should render without fail", () => {
    shallow(
      <Provider store={store}>
        <ProductCard {...props} />
      </Provider>
    );
  });
  it("should handle redirect to product details", () => {
    wrapper.find(CardActionArea).prop("onClick")();
    expect(window.mocks.mockHistoryPush).toHaveBeenCalled();
  });
  it("should handle move to cart", () => {
    wrapper.find(Button).simulate("click");
    expect(store.getActions()).toContainEqual({
      type: ADD_TO_CART,
      data: pick(props.product, ["id", "image", "title"]),
    });
  });
});

const storeWithCart = window.mocks.mockStore({
  auth: {
    cart: [{}, { ...props.product }],
  },
});

describe("ProductCard - with product in cart", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={storeWithCart}>
        <ProductCard {...props} />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());
  it("should render without fail", () => {
    shallow(
      <Provider store={storeWithCart}>
        <ProductCard {...props} />
      </Provider>
    );
  });
  it("should handle remove from cart", () => {
    wrapper.find(Button).prop("onClick")();
    expect(storeWithCart.getActions()).toContainEqual({
      type: REMOVE_FROM_CART,
      data: pick(props.product, ["id", "image", "title"]),
    });
  });
});

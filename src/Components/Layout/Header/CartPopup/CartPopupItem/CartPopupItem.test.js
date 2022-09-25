import { shallow, mount } from "enzyme";
import CartPopupItem from "./index";
import { Provider } from "react-redux";
import { REMOVE_FROM_CART } from "../../../../../Store/Actions/Auth";
import { IconButton } from "@material-ui/core";

const props = {
  product: {
    id: 123,
    title: "Product Title",
    image: "path/to/product/image",
  },
};

const store = window.mocks.mockStore({
  auth: {
    cart: [props.product],
  },
});

describe("Cart Popup Item", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <CartPopupItem {...props} />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());
  it("Should render without fail", () => {
    shallow(
      <Provider store={store}>
        <CartPopupItem {...props} />
      </Provider>
    );
  });
  it("Should handle cart item removal", () => {
    wrapper.find(IconButton).prop("onClick")();
    expect(store.getActions()).toEqual([
      {
        type: REMOVE_FROM_CART,
        data: props.product,
      },
    ]);
  });
});

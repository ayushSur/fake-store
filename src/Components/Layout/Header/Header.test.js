import { shallow, mount } from "enzyme";
import Header from "./index";
import { initState as authState } from "../../../Store/Reducers/Auth";
import { LOGOUT, TOGGLE_IS_ADMIN } from "../../../Store/Actions/Auth";
import { Provider } from "react-redux";
import CartPopup from "./CartPopup";
import { Button, IconButton } from "@material-ui/core";
import { act } from "react-dom/test-utils";

const unAuthStore = window.mocks.mockStore({
  auth: { ...authState, isAuth: 0 },
});

const authStoreUser = window.mocks.mockStore({
  auth: {
    ...authState,
    isAuth: 1,
    isAdmin: false,
    cart: [
      {
        id: 2,
        title: "product title",
        image: "url/of/product/image",
      },
    ],
  },
});

const authStoreAdmin = window.mocks.mockStore({
  auth: { ...authState, isAuth: 1, isAdmin: true },
});

describe("Header - un authenticated", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={unAuthStore}>
        <Header />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());
  it("Should render without fail", () => {
    shallow(
      <Provider store={unAuthStore}>
        <Header />
      </Provider>
    );
  });
  it("Should have user toggle button", () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });
  it("Should handle user toggle to Admin login", () => {
    wrapper.find(Button).simulate("click");
    expect(unAuthStore.getActions()).toEqual([{ type: TOGGLE_IS_ADMIN }]);
  });
});

describe("Header - authenticated - user", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={authStoreUser}>
        <Header />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());
  it("Should render without fail", () => {
    shallow(
      <Provider store={authStoreUser}>
        <Header />
      </Provider>
    );
  });
  it("Should have cart button", () => {
    expect(wrapper.find(IconButton).length).toEqual(1);
  });
  it("Should have logout button", () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });
  it("Should open cart on cart icon click", async () => {
    await act(async () => {
      await wrapper.find(IconButton).simulate("click");
      wrapper.update();
    });
    expect(wrapper.find(CartPopup).prop("anchorEl")).toBeTruthy();
  });
  it("Should handle close of cart popup", async () => {
    await act(async () => {
      await wrapper.find(CartPopup).prop("onClose")();
      wrapper.update();
    });
    expect(wrapper.find(CartPopup).prop("anchorEl")).toBeFalsy();
  });
  it("Should handle logout", () => {
    wrapper.find(Button).simulate("click");
    expect(authStoreUser.getActions()).toEqual([{ type: LOGOUT }]);
  });
});

describe("Header - authenticated - admin", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={authStoreAdmin}>
        <Header />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());
  it("Should render without fail", () => {
    shallow(
      <Provider store={authStoreAdmin}>
        <Header />
      </Provider>
    );
  });
  it("Should have logout button", () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });
  it("Should handle logout", () => {
    wrapper.find(Button).simulate("click");
    expect(authStoreUser.getActions()).toEqual([{ type: LOGOUT }]);
  });
});

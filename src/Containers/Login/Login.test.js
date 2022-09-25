import { Button, TextField } from "@material-ui/core";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import Login from ".";
import { LOGIN_INIT } from "../../Store/Actions/Auth";

const store = window.mocks.mockStore({
  auth: {
    isAdmin: false,
  },
});

describe("Login - user", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
  afterAll(() => wrapper.unmount());

  it("Should mount without fail", () => {
    shallow(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
  it("Should handle switch to signup", async () => {
    await act(async () => {
      await wrapper.find(Button).at(1).simulate("click");
      wrapper.update();
    });
    expect(wrapper.find(TextField).length).toEqual(3);
  });
  it("Should handle switch back to signin", async () => {
    await act(async () => {
      await wrapper.find(Button).at(1).simulate("click");
      wrapper.update();
    });
    expect(wrapper.find(TextField).length).toEqual(2);
  });
  it("should handle username input change validation error", async () => {
    const fieldProps = wrapper.find(TextField).at(0).props();
    await act(async () => {
      await fieldProps.onChange({
        target: { id: fieldProps.id, value: "" },
      });
      wrapper.update();
    });
    expect(wrapper.find(TextField).at(0).prop("value")).toEqual("");
    expect(wrapper.find(TextField).at(0).prop("helperText")).toBeTruthy();
  });
  it("should handle valid username input change", async () => {
    const fieldProps = wrapper.find(TextField).at(0).props();
    await act(async () => {
      await fieldProps.onChange({
        target: { id: fieldProps.id, value: "abc@test.com" },
      });
      wrapper.update();
    });
    expect(wrapper.find(TextField).at(0).prop("value")).toEqual("abc@test.com");
    expect(wrapper.find(TextField).at(0).prop("helperText")).toBeFalsy();
  });
  it("should handle password input change validation error", async () => {
    const fieldProps = wrapper.find(TextField).at(1).props();
    await act(async () => {
      await fieldProps.onChange({
        target: { id: fieldProps.id, value: "1234" },
      });
      wrapper.update();
    });
    expect(wrapper.find(TextField).at(1).prop("value")).toEqual("1234");
    expect(wrapper.find(TextField).at(1).prop("helperText")).toBeTruthy();
  });
  it("should handle valid password input change", async () => {
    const fieldProps = wrapper.find(TextField).at(1).props();
    await act(async () => {
      await fieldProps.onChange({
        target: { id: fieldProps.id, value: "Password@1234" },
      });
      wrapper.update();
    });
    expect(wrapper.find(TextField).at(1).prop("value")).toEqual(
      "Password@1234"
    );
    expect(wrapper.find(TextField).at(1).prop("helperText")).toBeFalsy();
  });
  it("should handle login pressing enter after password input", () => {
    const fieldProps = wrapper.find(TextField).at(1).props();
    wrapper.find(TextField).at(1).prop("onKeyPress")({
      keycode: 13,
      target: { id: fieldProps.id },
    });
    expect(store.getActions()).toContainEqual({ type: LOGIN_INIT });
  });
  it("should handle login by login button click", () => {
    wrapper.find(Button).at(0).prop("onClick")();
    expect(store.getActions()).toContainEqual({ type: LOGIN_INIT });
  });
});

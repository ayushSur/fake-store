import { shallow, mount } from "enzyme";
import App from "./App";
import { Provider } from "react-redux";
import Header from "../src/Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import AppRoutes from "./Routes";
import { initState as authState } from "../src/Store/Reducers/Auth";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: "/",
  })),
}));

const store = window.mocks.mockStore({
  auth: authState,
});

describe("App", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  afterAll(() => {
    wrapper.unmount();
  });
  it("Should render withour fail", () => {
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  it("Should have header", () => {
    expect(wrapper.find(Header).length).toEqual(1);
  });
  it("Should have app routes", () => {
    expect(wrapper.find(AppRoutes).length).toEqual(1);
  });
  it("Should have footer", () => {
    expect(wrapper.find(Footer).length).toEqual(1);
  });
});

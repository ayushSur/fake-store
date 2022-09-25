// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import configureStore from "redux-mock-store";
import { ApiMiddleware } from "../src/Store/Middlewares/api";
import thunk from "redux-thunk";

// Setup Enzyme Adapter
Enzyme.configure({ adapter: new Adapter() });

// Setup mock redux store
const middlewares = [ApiMiddleware, thunk];
const mockStore = configureStore(middlewares);

// Setup mock react router
const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn().mockImplementation(() => ({
    push: mockHistoryPush,
    goBack: mockHistoryGoBack,
  })),
}));

// Setup Window object
window.scroll = jest.fn();
window.mocks = {
  mockStore,
  mockHistoryPush,
  mockHistoryGoBack,
};

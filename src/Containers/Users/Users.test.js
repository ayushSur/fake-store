import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import Users from ".";
import { users } from "../../MockData";
import { GET_USERS_INIT } from "../../Store/Actions/Admin";
import axios from "axios";
import { Button, TableRow } from "@material-ui/core";

const store = window.mocks.mockStore({
  admin: {
    userList: users.results,
  },
});

axios.request = jest
  .fn()
  .mockImplementation(() => new Promise((resolve) => resolve({ data: users })));

describe("Users", () => {
  let wrapper;
  beforeAll(async () => {
    wrapper = await mount(
      <Provider store={store}>
        <Users />
      </Provider>
    );
    wrapper.update();
  });
  afterAll(() => wrapper.unmount());
  it("Should render without fail", () => {
    shallow(
      <Provider store={store}>
        <Users />
      </Provider>
    );
  });
  it("Should get the list of users on load", () => {
    expect(store.getActions()).toContainEqual({ type: GET_USERS_INIT });
  });
  it("Should render list of the users", () => {
    expect(wrapper.find(TableRow).length).toEqual(users.results.length + 1);
  });
  it("Should handle user details redirect", () => {
    wrapper.find(Button).at(0).simulate("click");
    expect(window.mocks.mockHistoryPush).toHaveBeenCalled();
  });
});

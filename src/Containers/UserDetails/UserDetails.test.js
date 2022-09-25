import { IconButton } from "@material-ui/core";
import { shallow, mount } from "enzyme";
import UserDetails from ".";
import { users } from "../../MockData";

const mockLocationState = { user: users.results[0] };
const mockHistoryGoBack = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn().mockImplementation(() => ({
    goBack: mockHistoryGoBack,
  })),
  useLocation: jest.fn().mockImplementation(() => ({
    state: mockLocationState,
  })),
}));

describe("Users", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<UserDetails />);
  });
  afterAll(() => wrapper.unmount());
  it("Should handle go back", () => {
    wrapper.find(IconButton).simulate("click");
    expect(mockHistoryGoBack).toHaveBeenCalled();
  });
});

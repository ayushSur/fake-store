import { shallow } from "enzyme";
import Footer from "./index";

describe("Footer", () => {
  it("Should render without fail", () => {
    shallow(<Footer />);
  });
});

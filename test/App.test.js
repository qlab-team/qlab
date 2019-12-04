import App from "../src/components/App";

describe("<App /> rendering", () => {
  it("should render one <div>", () => {
    let wrapper = shallow(<App />);
    expect(wrapper.children("div")).toHaveLength(1);
  });
});

import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

global.React = React;
global.ReactDOM = ReactDOM;
global.shallow = shallow;
global.render = render;
global.mount = mount;

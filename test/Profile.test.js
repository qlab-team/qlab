import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import Profile from "../src/components/Dashboard/Profile/Profile";

// Set test data
const firebase = {
  auth: {
    uid: "7HPkYnHBpyTxQtdkSu1UPyzbNls1",
    displayName: "eriko",
    isLoaded: true
  }
};
const userItems = [
  {
    item_id: 0,
    item_name: "Snake Cat Badge",
    item_price: 999,
    purchase_date: "Mon Dec 16 2019 16:59:05 GMT+0900 (Japan Standard Time)"
  },
  {
    item_id: 1,
    item_name: "Derek Badge",
    item_price: 0,
    purchase_date: "Sat Dec 14 2019 15:13:56 GMT+0900 (Japan Standard Time)"
  }
];
const userAchievements = [
  {
    achievement_name: "Got 1000 points!"
  },
  {
    achievement_name: "Reached the top of the leaderboard!"
  }
];
const user = {
  isLoggedIn: true,
  profile: {
    achievements: userAchievements,
    auth_id: "7HPkYnHBpyTxQtdkSu1UPyzbNls1",
    items: userItems
  },
  user_id: "SQzKtzonCPT5Sh8OUyU2",
  investors: []
};
const state = {
  firebase: firebase,
  user: user,
  userItems: userItems,
  userAchievements: userAchievements
};

describe("Chech props", () => {
  const createMockStore = configureStore();
  const store = createMockStore(state);

  const wrapper = shallow(<Profile store={store} />);

  it("Chech props : userItems", () => {
    expect(wrapper.props().userItems).toBe(state.userItems);
  });
  it("Chech props : achievements", () => {
    expect(wrapper.props().achievements).toBe(state.achievements);
  });
});

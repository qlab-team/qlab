import initState from "../initState";

const leaderboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_LEADERBOARD_INFO": {
      state.allUsers = action.users;
      console.log(state);
      return state;
    }
    default:
      return state;
  }
};

export default leaderboardReducer;

const initState = {
  board: [],
  last_updated: ""
};

const leaderboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_LEADERBOARD_INFO": {
      return {
        ...state,
        board: action.leaderboard.allUsers.board,
        last_updated: action.leaderboard.allUsers.last_updated
      };
    }
    default:
      return state;
  }
};

export default leaderboardReducer;

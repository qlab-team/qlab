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
    case "ADD_INVESTMENT": {
      console.log(action.data);
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default leaderboardReducer;

const initState = {
  getTransactions: [],
  last_updated: ""
};

const transactionsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS": {
      return {
        ...state
        // board: action.leaderboard.allUsers.board,
        // last_updated: action.leaderboard.allUsers.last_updated
      };
    }
    default:
      return state;
  }
};

export default transactionsReducer;

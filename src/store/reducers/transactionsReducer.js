const initState = {
  investment_history: [],
  quiz_history: [],
  last_updated: ""
};

const transactionsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS": {
      return {
        ...state,
        investment_history: action.transactions.investment_history,
        quiz_history: action.transactions.quiz_history,
        last_updated: action.transactions.last_updated
      };
    }
    default:
      return state;
  }
};

export default transactionsReducer;

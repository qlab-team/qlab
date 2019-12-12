const initState = {
  investments: [],
  last_updated: ""
};

const transactionsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS": {
      console.log(action);
      return {
        ...state,
        investments: action.transactions.investments,
        last_updated: action.transactions.last_updated
      };
    }
    default:
      return state;
  }
};

export default transactionsReducer;

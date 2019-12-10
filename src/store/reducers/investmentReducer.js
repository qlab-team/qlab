// WILL NEED TO MOVE OTHER INVESTMENT PROCESSES INTO HERE

const initState = {
  investmentIncome: 0,
  investmentPayoutToday: false
};

const investmentReducer = (state = initState, action) => {
  switch (action.type) {
    case "RESOLVE_INVESTMENT": {
      return {
        ...state,
        investmentIncome: action.income,
        investmentPayout: action.payout
      };
    }
    case "INVESTMENT_NOTIFICATION_READ": {
      return {
        ...state,
        investmentIncome: 0,
        investmentPayout: false
      };
    }
    default:
      return state;
  }
};

export default investmentReducer;

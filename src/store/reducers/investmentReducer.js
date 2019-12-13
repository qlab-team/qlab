// WILL NEED TO MOVE OTHER INVESTMENT PROCESSES INTO HERE

const initState = {
  investmentIncome: 0,
  investmentPayoutToday: false,
  checked: false,
  investments: []
};

const investmentReducer = (state = initState, action) => {
  switch (action.type) {
    case "RESOLVE_INVESTMENT": {
      return {
        ...state,
        investmentIncome: action.income,
        investmentPayoutToday: action.payout,
        checked: true
      };
    }
    case "INVESTMENT_NOTIFICATION_READ": {
      return {
        ...state,
        investmentIncome: 0,
        investmentPayout: false
      };
    }
    case "GET_INVESTMENTS": {
      return {
        ...state,
        investments: action.investments
      };
    }
    default:
      return state;
  }
};

export default investmentReducer;

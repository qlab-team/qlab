const initState = {
  investments: []
};

const statsReducer = (state = initState, action) => {
  switch (action.type) {
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

export default statsReducer;

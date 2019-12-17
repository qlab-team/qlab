const initState = {
  badgesInvisible: {
    profile: true,
    stats: true
  }
};

const sidebarReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_BADGE_INVISIBLE": {
      console.log(action.data);
      return {
        ...state,
        badgesInvisible: {
          profile: action.profile,
          stats: action.stats
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default sidebarReducer;

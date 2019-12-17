const initState = {
  badgesInvisible: {
    profile: true,
    stats: true
  }
};

const sidebarReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_BADGE_INVISIBLE": {
      console.log(action);
      return {
        ...state,
        badgesInvisible: {
          ...state.badgesInvisible,
          profile:
            action.profile !== undefined
              ? action.profile
              : state.badgesInvisible.profile,
          stats:
            action.stats !== undefined
              ? action.stats
              : state.badgesInvisible.stats
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default sidebarReducer;

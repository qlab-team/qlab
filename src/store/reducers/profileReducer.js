const initState = {
  profileAuth: {},
  profileUser: {}
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PROFILE_INFO": {
      return {
        ...state,
        profileAuth: action.profileAuth,
        profileUser: action.profileUser
      };
    }
    default:
      return state;
  }
};

export default profileReducer;

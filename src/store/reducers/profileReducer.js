const initState = {
  myProfile: []
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PROFILE_INFO": {
      return {
        ...state,
        myProfile: action.profile.myProfile
      };
    }
    default:
      return state;
  }
};

export default profileReducer;

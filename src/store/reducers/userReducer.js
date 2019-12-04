const initState = {
  isLoggedIn: false,
  userProfile: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_PROFILE_GET":
      return {
        ...state,
        userProfile: action.userProfile
      };
    case "USER_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "USER_LOGOUT":
      return initState;
    default:
      return state;
  }
};

export default userReducer;

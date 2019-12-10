const initState = {
  isLoggedIn: false,
  userProfile: {}
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userProfile: action.userProfile,
        user_id: action.user_id
      };
    case "USER_LOGOUT":
      return initState;
    default:
      return state;
  }
};

export default userReducer;

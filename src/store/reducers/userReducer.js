const initState = {
  isLoggedIn: false,
  profile: {}
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        profile: action.profile,
        user_id: action.user_id
      };
    case "USER_LOGOUT":
      return initState;
    default:
      return state;
  }
};

export default userReducer;

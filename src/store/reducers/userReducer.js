const initState = {
  isLoggedIn: false,
  profile: {},
  user_id: "",
  investors: []
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        profile: action.profile,
        user_id: action.user_id,
        photoURL: action.photoURL
      };
    case "USER_LOGOUT":
      return initState;
    case "GET_INVESTORS":
      return {
        ...state,
        investors: action.investors
      };
    default:
      return state;
  }
};

export default userReducer;

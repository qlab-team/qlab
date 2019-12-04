const initState = {};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_SUCCESS":
      return state;
    default:
      return state;
  }
};

export default userReducer;

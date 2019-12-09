const initState = {
  profile: []
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PROFILE_INFO": {
      return {
        ...state,
        displayName: action.profile.displayName,
        email: action.profile.email,
        createdAt: action.profile.createdAt,
        lastLoginAt: action.profile.lastLoginAt,
        photoURL: action.profile.photoURL,
        uid: action.profile.uid,
        q_points: action.q_points,
        q_score: action.q_score
      };
    }
    default:
      return state;
  }
};

export default profileReducer;

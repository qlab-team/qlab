const getProfile = () => {
  return (dispatch, getState) => {
    const profile = getState().firebase.auth;
    dispatch({
      type: "GET_PROFILE_INFO",
      profile: profile
    });
  };
};

export { getProfile };

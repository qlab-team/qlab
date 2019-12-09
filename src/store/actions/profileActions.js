const getProfile = auth => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    // get profile from local Strage
    const profileAuth = JSON.parse(localStorage.auth);
    const profileUser = JSON.parse(localStorage.user);

    firestore
      .collection("users")
      .where("auth_id", "==", profileAuth.uid)
      .get()
      .then(doc => {
        dispatch({
          type: "GET_PROFILE_INFO",
          profile: profileAuth,
          q_points: profileUser.userProfile.q_points,
          q_score: profileUser.userProfile.q_score
        });
      })
      .catch(e => {
        console.log("err : ", e);
      });
  };
};

export { getProfile };

const getProfile = auth => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    // get profile from local Strage
    const profile = JSON.parse(localStorage.auth);

    firestore
      .collection("users")
      .where("auth_id", "==", profile.uid)
      .get()
      .then(doc => {
        dispatch({
          type: "GET_PROFILE_INFO",
          profile: profile
        });
      })
      .catch(e => {
        console.log("err : ", e);
      });
  };
};

export { getProfile };

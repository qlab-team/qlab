const getProfile = () => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const userProfile = getState();
    console.log(userProfile);
    firestore
      .get({ collection: "users" })
      .then(doc => {
        dispatch({
          type: "GET_PROFILE_INFO",
          profile: { myProfile: doc.data() }
        });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getProfile };

const getLeaderboard = () => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .get({ collection: "leaderboard", doc: "allUsers" })
      .then(doc => {
        dispatch({
          type: "GET_LEADERBOARD_INFO",
          leaderboard: { allUsers: doc.data() }
        });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getLeaderboard };

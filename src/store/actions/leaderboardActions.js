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

const addInvestment = auth => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    // const firestore = getFirestore();
    // firestore
    //   .collection("users")
    //   .doc("x")
    //   .set({})
    //   .then(function() {
    //     console.log("Investment successfully added!");
    //   })
    //   .catch(function(error) {
    //     console.error("Error writing document: ", error);
    //   });
  };
};

export { getLeaderboard, addInvestment };

const getTransactions = () => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    console.log("Get getTransactions Called");
    // const firestore = getFirestore();
    // firestore
    //   .get({ collection: "leaderboard", doc: "allUsers" })
    //   .then(doc => {
    //     dispatch({
    //       type: "GET_LEADERBOARD_INFO",
    //       leaderboard: { allUsers: doc.data() }
    //     });
    //   })
    //   .catch(e => {
    //     console.log("err :", e);
    //   });
  };
};

export { getTransactions };

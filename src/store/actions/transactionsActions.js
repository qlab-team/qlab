const getTransactions = authId => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    console.log("Get getTransactions Called");
    const firestore = getFirestore();
    console.log(authId);

    firestore
      .collection("transaction_history")
      .where("auth_id", "==", authId)
      .get()
      .then(res => {
        console.log(res);
        dispatch({
          type: "GET_LEADERBOARD_INFO"
          // transactions: { allUsers: doc.data() }
        });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getTransactions };

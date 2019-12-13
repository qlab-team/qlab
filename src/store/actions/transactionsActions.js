const getTransactions = authId => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get getTransactions Called");
    // make async call to database
    const firestore = getFirestore();

    firestore
      .collection("transaction_history")
      .where("auth_id", "==", authId)
      .get()
      .then(res => {
        dispatch({
          type: "GET_TRANSACTIONS",
          transactions: res.docs[0].data()
        });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getTransactions };

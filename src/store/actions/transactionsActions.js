const getTransactions = authId => {
  return (dispatch, getState, { getFirestore }) => {
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
        console.error("err :", e);
      });
  };
};

export { getTransactions };

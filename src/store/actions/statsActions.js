const getInvestments = auth => {
  return (dispatch, getState, { getFirestore }) => {
    console.log(auth);
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("users")
      .where("auth_id", "==", auth.uid)
      .get()
      .then(res => {
        const doc = res.docs[0];
        console.log(doc.data().investments);
        return doc.data();
      })
      .then(data => {
        dispatch({
          type: "GET_INVESTMENTS",
          investments: data.investments
        });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getInvestments };

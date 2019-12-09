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

const removeInvestment = data => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log("from action", data);
    firestore
      .collection("users")
      .where("auth_id", "==", data.uid)
      .get()
      .then(res => {
        console.log(res);
        const docId = res.docs[0].id;
        return docId;
      })
      .then(docId => {
        firestore
          .collection("users")
          .doc(docId)
          .update({
            investments: []
          })
          .catch(e => {
            console.log("err :", e);
          });
      });
  };
};

export { getInvestments, removeInvestment };

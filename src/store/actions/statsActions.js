const getInvestments = auth => {
  return (dispatch, getState, { getFirestore }) => {
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

const removeInvestment = (data, auth, user) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const newInvestments = user.userProfile.investments.filter(investment => {
      return investment.user_id !== data.user_id;
    });
    firestore
      .collection("users")
      .doc(user.user_id)
      .update({
        investments: newInvestments
      })
      .then(() => {
        console.log("Investment Removed");
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
          });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getInvestments, removeInvestment };

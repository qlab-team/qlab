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

const addInvestment = data => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(data);
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
            investments: firestore.FieldValue.arrayUnion({
              display_name: data.username,
              date: data.date,
              q_score: data.q_score,
              q_points: data.q_points
            })
          })
          .catch(e => {
            console.log("err :", e);
          });
      });
  };
};

export { getLeaderboard, addInvestment };

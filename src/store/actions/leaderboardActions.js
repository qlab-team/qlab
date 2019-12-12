const getLeaderboard = () => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    console.log("Get Leaderboard Called");
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

const addInvestment = (data, auth, user) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Add Investment Called");
    const firestore = getFirestore();
    firestore
      .collection("users")
      .where("auth_id", "==", auth.uid)
      .get()
      .then(collection => {
        let userHasInvestment = false;
        const investments = collection.docs[0].data().investments;
        investments.forEach(investment => {
          if (investment.display_name === data.username)
            userHasInvestment = true;
        });
        if (!userHasInvestment) {
          firestore
            .collection("users")
            .doc(user.user_id)
            .update({
              investments: firestore.FieldValue.arrayUnion({
                display_name: data.username,
                date: data.investment_made,
                points_cost: data.q_score * 5,
                points_earned: 0,
                user_id: data.user_id
              })
            });
        }
      })

      .catch(e => {
        console.log("err :", e);
      });
  };
};

export { getLeaderboard, addInvestment };

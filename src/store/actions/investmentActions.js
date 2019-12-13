export const addInvestment = (data, auth, user) => {
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

export const getInvestments = auth => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    console.log("Get Investments for Stats Called");
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

export const removeInvestment = (data, auth, user) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Remove Investment Called");
    const firestore = getFirestore();
    const newInvestments = user.profile.investments.filter(investment => {
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

export const notificationRead = () => {
  return dispatch => {
    console.log("Investment Notification Read");
    dispatch({
      type: "INVESTMENT_NOTIFICATION_READ"
    });
  };
};

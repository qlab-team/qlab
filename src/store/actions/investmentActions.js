export const addInvestment = (data, auth, user) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Add Investment Called");
    const firestore = getFirestore();
    const state = getState();
    const user_id = state.user.user_id;
    firestore
      .collection("users")
      .doc(user_id)
      .get()
      .then(document => {
        let userHasInvestment = false;
        const investments = document.data().investments;
        investments.forEach(investment => {
          if (investment.display_name === data.username)
            userHasInvestment = true;
        });
        if (!userHasInvestment) {
          firestore
            .collection("users")
            .doc(user_id)
            .update({
              investments: firestore.FieldValue.arrayUnion({
                display_name: data.username,
                date: data.investment_made,
                points_cost: data.q_score * 5,
                points_earned: 0,
                user_id: data.user_id,
                q_score: data.q_score
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
    const state = getState();
    const user_id = state.user.user_id;
    firestore
      .collection("users")
      .doc(user_id)
      .get()
      .then(doc => {
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

export const removeInvestment = (data, auth) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Remove Investment Called");
    const firestore = getFirestore();
    const state = getState();
    const user_id = state.user.user_id;
    let newInvestments = [];
    // get current investments and filter them
    firestore
      .collection("users")
      .doc(user_id)
      .get()
      // filter the investments
      .then(doc => {
        const docData = doc.data();
        const currInvestments = docData.investments;
        newInvestments = currInvestments.filter(investment => {
          return investment.user_id !== data.user_id;
        });
        return newInvestments;
      })
      .then(newInvestments => {
        // update the investments with removed version
        firestore
          .collection("users")
          .doc(user_id)
          .update({
            investments: newInvestments
          })
          .then(() => {
            dispatch({
              type: "GET_INVESTMENTS",
              investments: newInvestments
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

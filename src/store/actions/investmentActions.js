export const addInvestment = data => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const user_id = state.user.user_id;

    const points_cost = data.q_score * 5;

    if (data.user_id === user_id) {
      dispatch({
        type: "OPEN_DIALOG",
        open: true,
        data,
        error: "You cannot invest in yourself."
      });
      return;
    }

    const currentPoints = state.user.profile.q_points;
    if (points_cost > currentPoints) {
      dispatch({
        type: "OPEN_DIALOG",
        open: true,
        data,
        error: "You don't have enough money for this investment."
      });
      return;
    }

    firestore
      .collection("users")
      .doc(user_id)
      .get()
      .then(document => {
        const investments = document.data().investments;

        if (investments.length >= 2) {
          dispatch({
            type: "OPEN_DIALOG",
            open: true,
            data,
            error: "You already have two investments!"
          });
          return;
        }

        for (let invInd = 0; invInd < investments.length; invInd++) {
          const investment = investments[invInd];
          if (investment.user_id === data.user_id) {
            dispatch({
              type: "OPEN_DIALOG",
              open: true,
              data,
              error: "You already have this investment!"
            });
            return;
          }
        }

        dispatch({
          type: "SET_BADGE_INVISIBLE",
          stats: false
        });

        const newInvestmentObject = {
          display_name: data.username,
          date: data.investment_made,
          points_cost,
          points_earned: 0,
          user_id: data.user_id,
          q_score: data.q_score,
          photoURL: data.photoURL
        };

        firestore
          .collection("users")
          .doc(user_id)
          .update({
            investments: firestore.FieldValue.arrayUnion(newInvestmentObject),
            q_points: firestore.FieldValue.increment(-points_cost)
          });

        const newInvestmentHistoryObject = {
          active: true,
          points_cost,
          points_earned: 0,
          timestamp_start: data.investment_made,
          username: data.username,
          user_id: data.user_id,
          photoURL: data.photoURL
        };

        // Update in History
        firestore
          .collection("transaction_history")
          .doc(user_id)
          .update({
            investment_history: firestore.FieldValue.arrayUnion(
              newInvestmentHistoryObject
            )
          });
      })
      .catch(e => {
        console.error("err :", e);
      });
  };
};

export const getInvestments = auth => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("users")
      .where("auth_id", "==", auth.uid)
      .get()
      .then(data => {
        dispatch({
          type: "GET_INVESTMENTS",
          investments: data.docs[0].data().investments
        });
      })
      .catch(e => {
        console.error("err :", e);
      });
  };
};

export const removeInvestment = toBeRemoved => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const user_id = state.user.user_id;
    let newInvestments = [];
    firestore
      .collection("users")
      .doc(user_id)
      .get()
      .then(doc => {
        const docData = doc.data();
        const currInvestments = docData.investments;
        newInvestments = currInvestments.filter(investment => {
          return investment.user_id !== toBeRemoved.user_id;
        });
        return newInvestments;
      })
      .then(newInvestments => {
        return firestore
          .collection("users")
          .doc(user_id)
          .update({
            investments: newInvestments
          });
      })
      .then(() => {
        dispatch({
          type: "GET_INVESTMENTS",
          investments: newInvestments
        });
      })
      .then(() => {
        firestore
          .collection("transaction_history")
          .doc(user_id)
          .get()
          .then(doc => {
            const newHistory = doc.data().investment_history.map(record => {
              if (record.active && record.user_id === toBeRemoved.user_id) {
                return {
                  ...record,
                  active: false,
                  timestamp_end: new Date()
                };
              }
              return record;
            });
            firestore
              .collection("transaction_history")
              .doc(user_id)
              .update({
                investment_history: newHistory
              });
          });
      })
      .catch(e => {});
  };
};

export const notificationRead = () => {
  return dispatch => {
    dispatch({
      type: "INVESTMENT_NOTIFICATION_READ"
    });
  };
};

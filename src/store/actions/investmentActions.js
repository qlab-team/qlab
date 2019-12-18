export const addInvestment = (data, auth, user) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Add Investment Called");
    const firestore = getFirestore();
    const state = getState();
    const user_id = state.user.user_id;

    const points_cost = data.q_score * 5;

    //Cancel Out if Investment Is in Oneself
    if (data.user_id === user_id) {
      console.log("You cannot invest in yourself.");
      return;
    }

    //Cancel Out if you don't have enough money to buy the investment
    const currentPoints = state.user.q_points;
    if (points_cost > currentPoints) {
      console.log("You don't have enough money for this investment.");
      return;
    }

    firestore
      .collection("users")
      .doc(user_id)
      .get()
      .then(document => {
        const investments = document.data().investments;

        //Cancel Out if There are Already Two Investments
        if (investments.length >= 2) {
          console.log("You already have two investments!");
          return;
        }

        //Cancel Out if Investment Already Exists
        for (let invInd = 0; invInd < investments.length; invInd++) {
          const investment = investments[invInd];
          if (investment.user_id === data.user_id) {
            console.log("You already have this investment!");
            return;
          }
        }

        // show badge in stats list item
        console.log("Set Badge Invisible Called: false");
        dispatch({
          type: "SET_BADGE_INVISIBLE",
          stats: false
        });

        // New Investment Object
        const newInvestmentObject = {
          display_name: data.username,
          date: data.investment_made,
          points_cost,
          points_earned: 0,
          user_id: data.user_id,
          q_score: data.q_score,
          photoURL: data.photoURL
        };

        // Add to User
        firestore
          .collection("users")
          .doc(user_id)
          .update({
            investments: firestore.FieldValue.arrayUnion(newInvestmentObject),
            q_points: firestore.FieldValue.increment(-points_cost)
          });
        console.log("New Investment Created!");

        // New Investment History Object
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
        console.log("Investment History Object Created!");
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
      .then(data => {
        dispatch({
          type: "GET_INVESTMENTS",
          investments: data.docs[0].data().investments
        });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export const removeInvestment = (toBeRemoved, auth) => {
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
          return investment.user_id !== toBeRemoved.user_id;
        });
        return newInvestments;
      })
      .then(newInvestments => {
        // update the investments with the new array
        return firestore
          .collection("users")
          .doc(user_id)
          .update({
            investments: newInvestments
          });
      })
      .then(() => {
        console.log("Investment removed.");
        //Update State
        dispatch({
          type: "GET_INVESTMENTS",
          investments: newInvestments
        });
      })
      .then(() => {
        // Close Out History
        firestore
          .collection("transaction_history")
          .doc(user_id)
          .get()
          // Get History
          .then(doc => {
            // Map New History, deactivating old ones
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
            // Send Update
            firestore
              .collection("transaction_history")
              .doc(user_id)
              .update({
                investment_history: newHistory
              });
            console.log("Transaction History Updated");
          });
      })
      .catch(e => {
        console.log("err :", e);
      });
  };
};

export const notificationRead = () => {
  return dispatch => {
    console.log("Investment Notification Called");
    dispatch({
      type: "INVESTMENT_NOTIFICATION_READ"
    });
  };
};

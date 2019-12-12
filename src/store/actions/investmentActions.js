const didUserQuizYesterday = async id => {
  const didUserQuizURL =
    "https://asia-northeast1-qlab-cc.cloudfunctions.net/didUserQuizYesterday";

  const query = didUserQuizURL + `?user_id=${id}`;
  console.log("Did User Quiz Called");
  try {
    const response = await fetch(query, {
      credentials: "omit"
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return;
  }
};

const updatePoints = async (firestore, user_id, points) => {
  console.log("Add Points Called");
  firestore
    .collection("users")
    .doc(user_id)
    .update({
      q_points: firestore.FieldValue.increment(points)
    })
    .catch(e => {
      console.log("err :", e);
    });
  console.log("Points from Investment Added");
};

const removeInvestmentOld = async (firestore, user, investment_id) => {
  console.log("Remove Investment Called");
  const newInvestments = user.profile.investments.filter(investment => {
    return investment.user_id !== investment_id;
  });
  firestore
    .collection("users")
    .doc(user.user_id)
    .update({
      investments: newInvestments
    })
    .catch(e => {
      console.log("err :", e);
    });
};

export const resolveInvestment = (investments, user) => {
  return async (dispatch, getState, { getFirestore }) => {
    console.log("Resolve Investment Called");
    const firestore = getFirestore();
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;

    if (investments.length > 0) {
      // For Each Investment
      investments.forEach(async investment => {
        // Check if investment old enough
        if (now - investment.date.toDate() < oneDay) {
          //Investment not Resolved yet, skip it
          console.log("Investment Not Resolved Yet");
          return;
        } else {
          console.log("Attempting to Resolve Investment..");
          const response = await didUserQuizYesterday(investment.user_id);
          if (!response) {
            //Probably an Error
            return;
          }
          const investmentDidQuiz = response.data;
          // If No Payout,
          if (!investmentDidQuiz.payout) {
            console.log("User Didn't Do Quiz");
            dispatch({
              type: "RESOLVE_INVESTMENT",
              income: 0,
              payout: false
            });
            removeInvestmentOld(firestore, user, investment.user_id);
          } else {
            //If Payout
            console.log("User Did Do Quiz, Updating Points");
            updatePoints(firestore, user.user_id, investment.earnable_points);
            dispatch({
              type: "RESOLVE_INVESTMENT",
              income: investment.earnable_points,
              payout: true
            });
            removeInvestmentOld(firestore, user, investment.user_id);
          }
        }
      });
    } else {
      console.log("No Investments");
      return;
    }
  };
};

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

const didUserQuizYesterday = async id => {
  const didUserQuizURL =
    "https://asia-northeast1-qlab-cc.cloudfunctions.net/didUserQuizYesterday";

  const query = didUserQuizURL + `?user_id=${id}`;

  console.log(query)
  try {
    const response = await fetch(query, {
      credentials: 'omit',
    });
    return response.json();
  } catch (error) {
    console.log(error)
    return
  }
};

const updatePoints = async (firestore, user_id, points) => {
  firestore
    .collection("users")
    .doc(user_id)
    .update({
      q_points: firestore.FieldValue.increment(points)
    })
    .catch(e => {
      console.log("err :", e);
    });
  console.log('Points from Investment Added')
}

const removeInvestment = async (firestore, user, investment_id) => {
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
}

export const resolveInvestment = (investments, user) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;

    if (investments.length > 0) {
      // For Each Investment
      investments.forEach(async investment => {
        // Check if investment old enough
        if (now - investment.date.toDate() < oneDay) {
          //Investment not Resolved yet, skip it
          console.log("Not Resolved Yet")
          return;
        } else {

          console.log("Attempting to Resolve..")
          console.log({ investment })
          const investmentDidQuiz = await didUserQuizYesterday(investment.user_id);
          if (!investmentDidQuiz) {
            //Probably an Error
            return
          }
          // If No Payout,
          if (!investmentDidQuiz.payout) {
            console.log("User Didn't Do Quiz")
            dispatch({
              type: "RESOLVE_INVESTMENT",
              investmentIncome: 0,
              investmentPayout: false
            });
            removeInvestment(firestore, user, investment.user_id)
          } else {
            //If Payout
            console.log("User Did Do Quiz")
            updatePoints(firestore, user.user_id, investment.earnable_points)
            dispatch({
              type: "RESOLVE_INVESTMENT",
              investmentIncome: investment.earnable_points,
              investmentPayout: true
            });
          }
        }
      });
    } else {
      console.log("No Investments")
      return
    }

    // const newInvestments = user.userProfile.investments.filter(investment => {
    //   return investment.user_id !== investments.user_id;
    // });
    // firestore
    //   .collection("users")
    //   .doc(user.user_id)
    //   .update({
    //     investments: newInvestments
    //   })
    //   .then(() => {
    //     console.log("Investment Removed");
    //     firestore
    //       .collection("users")
    //       .doc(user.user_id)
    //       .get()
    //       .then(res => {
    //         const doc = res.docs[0];
    //         return doc.data();
    //       })
    //       .then(data => {
    //         dispatch({
    //           type: "GET_INVESTMENTS",
    //           investments: data.investments
    //         });
    //       });
    //   })
    //   .catch(e => {
    //     console.log("err :", e);
    //   });
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

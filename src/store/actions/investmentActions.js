const didUserQuizYesterday = async id => {
  const didUserQuizURL =
    "https://asia-northeast1-qlab-cc.cloudfunctions.net/didUserQuizYesterday";

  const query = `?user_id=${id}`;

  const response = await fetch(didUserQuizURL + query);

  return response.json();
};

export const resolveInvestment = (investments, user) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;

    // For Each Investment
    investments.forEach(async investment => {
      // Check if investment old enough
      if (now - investment.date.toDate() < oneDay) {
        //Investment not Resolved yet, skip it
        return;
      } else {
        const userDidQuiz = await didUserQuizYesterday(user.user_id);

        // If No Payout,
        if (!userDidQuiz.payout) {
          dispatch({
            type: "RESOLVE_INVESTMENT",
            investmentIncome: 0,
            investmentPayout: false
          });
        } else {
          //If Payout
          dispatch({
            type: "RESOLVE_INVESTMENT",
            investmentIncome: investment.earnable_points,
            investmentPayout: true
          });
        }
      }
    });

    const newInvestments = user.userProfile.investments.filter(investment => {
      return investment.user_id !== investments.user_id;
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
          .doc(user.user_id)
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

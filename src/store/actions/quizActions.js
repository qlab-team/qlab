const updateQuizInfo = quizId => {
  return {
    type: "UPDATE_QUIZ_INFO",
    quizId: quizId
  };
};

const getQuiz = quizId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore.get({ collection: "quizzes", doc: quizId }).then(doc => {
      dispatch({ type: "GET_QUIZ", quiz: doc.data() });
    });
  };
};

const addQuizInfo = quizPoints => {
  return (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const quiz_info = state.quiz.quizInfo;
    const user_id = state.user.user_id;
    const firestore = getFirestore();
    const now = new Date();
    firestore
      .collection("users")
      .doc(user_id)
      .update({
        q_points: firestore.FieldValue.increment(quizPoints),
        last_quiz_done: now,
        quiz_total: firestore.FieldValue.increment(1),
        quizzes_done_today: firestore.FieldValue.increment(1)
      })
      .then(() => {
        firestore
          .collection("transaction_history")
          .doc(user_id)
          .update({
            last_updated: now,
            quiz_history: firestore.FieldValue.arrayUnion({
              date: now,
              quiz_id: quiz_info.quiz_id,
              quiz_title: quiz_info.quiz_title,
              points_earned: quizPoints
            })
          });
      })
      .catch(e => {
        console.error("Could Not Update Quiz Info:", e);
      });
  };
};

const updateQuizRatingOnDatabase = userQuizRating => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();
    const quizId = state.quiz.currentQuiz;
    const quizRef = firestore.collection("quizzes").doc(quizId);
    firestore.runTransaction(transaction => {
      return transaction.get(quizRef).then(res => {
        const updatedQuizTaken = res.data().times_quiz_taken + 1;

        const currentQuizTotal =
          res.data().quiz_rating * res.data().times_quiz_taken;
        const newQuizAvg =
          (currentQuizTotal + userQuizRating) / updatedQuizTaken;

        transaction.update(quizRef, {
          times_quiz_taken: updatedQuizTaken,
          quiz_rating: newQuizAvg
        });
      });
    });
  };
};

export { addQuizInfo, getQuiz, updateQuizInfo, updateQuizRatingOnDatabase };

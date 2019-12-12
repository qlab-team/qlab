const updateQuizInfo = quizId => {
  return {
    type: "UPDATE_QUIZ_INFO",
    quizId: quizId
  };
};

const getQuiz = quizId => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get Quiz Called");
    // make async call to database
    const firestore = getFirestore();
    return firestore.get({ collection: "quizzes", doc: quizId }).then(doc => {
      dispatch({ type: "GET_QUIZ", quiz: doc.data() });
    });
  };
};

const addQuizInfo = (authId, quizPoints) => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Add Quiz Info Called");
    const firestore = getFirestore();
    //state = getState()
    //console.log(state.user.profile.auth_id); this will be how to get auth_id normally

    firestore
      .collection("users")
      .where("auth_id", "==", authId)
      .get()
      .then(res => {
        const docId = res.docs[0].id;
        return docId;
      })
      .then(docId => {
        firestore
          .collection("users")
          .doc(docId)
          .update({
            q_points: firestore.FieldValue.increment(quizPoints),
            last_quiz_done: new Date(),
            quiz_total: firestore.FieldValue.increment(1)
          })
          .catch(e => {
            console.log("err :", e);
          });
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
        console.log(newQuizAvg);

        transaction.update(quizRef, {
          times_quiz_taken: updatedQuizTaken,
          quiz_rating: newQuizAvg
        });
      });
    });
  };
};

export { addQuizInfo, getQuiz, updateQuizInfo, updateQuizRatingOnDatabase };

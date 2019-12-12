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

export { addQuizInfo, getQuiz, updateQuizInfo };

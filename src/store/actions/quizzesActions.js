const getQuizzes = quizId => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("quizzes")
      .get()
      .then(collection => {
        let quizzes = collection.docs.map(doc => {
          return doc.data();
        });
        dispatch({ type: "GET_QUIZZES", quizzes });
      });
  };
};

export { getQuizzes };

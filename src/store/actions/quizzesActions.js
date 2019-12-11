const getQuizzes = quizId => {
  return (dispatch, getState, { getFirestore }) => {
    console.log("Get Quizzes Called");
    // make async call to database
    const firestore = getFirestore();
    return firestore
      .collection("quizzes")
      .get()
      .then(collection => {
        let quizzes = collection.docs.map(doc => {
          console.log(doc.data());
          return doc.data();
        });
        dispatch({ type: "GET_QUIZZES", quizzes });
      });
  };
};

export { getQuizzes };

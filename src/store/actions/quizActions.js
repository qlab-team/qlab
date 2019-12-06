const updateQuizInfo = quizId => {
    return {
        type: "UPDATE_QUIZ_INFO",
        quizId: quizId
    }  
  };

const getQuiz = quizId => {
    return (dispatch, getState, { getFirestore }) => {
      // make async call to database
      const firestore = getFirestore();
      firestore
        .get({collection: 'Quizzes', doc: quizId})
        .then((doc) => {
          console.log(doc.data())
          dispatch({ type: "USER_LOGGED_IN", quiz: doc });
        });
    };
  };


export { updateQuizInfo, getQuiz }
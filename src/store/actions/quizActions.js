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
      return firestore
        .get({collection: 'quizzes', doc: quizId})
        .then((doc) => {
          console.log('data',doc.data())
          dispatch({ type: "GET_QUIZ", quiz: doc.data() });
        });
    };
  };

  

export { updateQuizInfo, getQuiz }
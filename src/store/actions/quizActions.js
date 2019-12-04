const updateQuizInfo = quizId => {
    return {
        type: "UPDATE_QUIZ_INFO",
        quizId: quizId
    }  
  };

//   export const getQuiz = quizId => {
//     return (dispatch, getState, { getFirestore }) => {
//       // make async call to database
//       const firestore = getFirestore();
//       firestore
//         .collection("Quizzes")
//         .add({
//           ...user,
//           username: "eriko",
//           points: 2,
//           createdAt: new Date()
//         })
//         .then(() => {
//           dispatch({ type: "USER_LOGGED_IN" });
//         });
//     };
//   };

export default updateQuizInfo
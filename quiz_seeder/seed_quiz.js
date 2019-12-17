const firebase = require("./fbConfig");
const quiz = require("./newquiz");
const db = firebase.firestore();

// Require firebase-admin so we can stub out some of its methods.
const admin = require("firebase-admin");

admin.initializeApp();

const generate_quiz_object = quiz_id => {
  return {
    quiz_description: quiz["quiz_description"],
    quiz_id,
    quiz_questions: quiz["quiz_questions"],
    quiz_length: quiz["quiz_length"],
    quiz_points: quiz["quiz_points"],
    quiz_title: quiz["quiz_title"],
    quiz_rating: 0,
    times_quiz_taken: 0
  };
};

function seedQuizzes() {
  admin
    .firestore()
    .collection("quizzes")
    .get()
    .then(snap => {
      console.log("Got Quizzes");
      return snap.size; // will return the collection size
    })
    .then(quiz_id => {
      console.log(`Adding Quiz #${quiz_id}`);
      return admin
        .firestore()
        .collection("quizzes")
        .doc(`${quiz_id}`) //set i to be one more than current amount of documents.
        .set(generate_quiz_object(quiz_id))
        .then(function() {
          console.log("Quiz successfully added!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    })
    .catch(function(error) {
      console.error("Error: ", error);
    });
}

seedQuizzes();

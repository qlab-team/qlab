import firebase from "../config/fbConfig";
const db = firebase.firestore();

const quizzes = [
  {
    quiz_description: "Big balls dangling in space.",
    quiz_id: "0",
    quiz_questions: [
      {
        question: "How many Planets in the solar system?",
        answers: ["8", "7", "5", "10"],
        correct_answer: "8"
      },
      {
        question: "Which Planet is the largest in the solar system?",
        answers: ["Mars", "Saturn", "Jupiter", "Mercury"],
        correct_answer: "Jupiter"
      },
      {
        question: "Which planet is the closest to the sun?",
        answers: ["Mars", "Saturn", "Jupiter", "Mercury"],
        correct_answer: "Mercury"
      }
    ],
    quiz_length: 3,
    quiz_points: 100,
    quiz_title: "Planets"
  },
  {
    quiz_description: "Reasons Why Derek Sucks",
    quiz_id: "1",
    quiz_questions: [
      {
        question: "He's a porky-ass son of a gun",
        answers: ["Yes", "Yes", "Yes", "Yes"],
        correct_answer: "Yes"
      },
      {
        question: "He laughs giddily when we are doing a good hacky-sack run",
        answers: ["Why", "Oh god", "Fuck, Derek", "WTF"],
        correct_answer: "Fuck, Derek"
      },
      {
        question: "He should shut his mouth",
        answers: ["Yes", "Yes", "Yes", "Yes"],
        correct_answer: "Yes"
      }
    ],
    quiz_length: 3,
    quiz_points: -300,
    quiz_title: "Derek"
  }
];

export default function seedQuizzes() {
  quizzes.map((quiz, i) => {
    db.collection("quizzes")
      .doc(`${i}`)
      .set({
        quiz_description: quiz["quiz_description"],
        quiz_id: quiz["quiz_id"],
        quiz_questions: quiz["quiz_questions"],
        quiz_length: quiz["quiz_length"],
        quiz_points: quiz["quiz_points"],
        quiz_title: quiz["quiz_title"]
      })
      .then(function() {
        console.log("Quizzes successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    return quiz;
  });
}

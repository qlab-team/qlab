import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import statsReducer from "./statsReducer";
import leaderboardReducer from "./leaderboardReducer";
import quizzesReducer from "./quizzesReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  user: userReducer,
  stats: statsReducer,
  quizzes: quizzesReducer,
  quiz: quizReducer,
  leaderboard: leaderboardReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import leaderboardReducer from "./leaderboardReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
  leaderboard: leaderboardReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

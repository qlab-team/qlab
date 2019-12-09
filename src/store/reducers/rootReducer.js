import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import leaderboardReducer from "./leaderboardReducer";
import profileReducer from "./profileReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
  leaderboard: leaderboardReducer,
  profile: profileReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

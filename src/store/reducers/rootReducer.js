//Reducers
import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import statsReducer from "./statsReducer";
import storeReducer from "./storeReducer";
import leaderboardReducer from "./leaderboardReducer";
import quizzesReducer from "./quizzesReducer";
import investmentReducer from "./investmentReducer";

//Redux
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  user: userReducer,
  stats: statsReducer,
  quizzes: quizzesReducer,
  quiz: quizReducer,
  store: storeReducer,
  leaderboard: leaderboardReducer,
  investments: investmentReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

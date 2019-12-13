//Reducers
import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import statsReducer from "./statsReducer";
import storeReducer from "./storeReducer";
import leaderboardReducer from "./leaderboardReducer";
import transactionsReducer from "./transactionsReducer";
import quizzesReducer from "./quizzesReducer";
import investmentReducer from "./investmentReducer";
import profileReducer from "./profileReducer";

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
  transactions: transactionsReducer,
  investments: investmentReducer,
  profile: profileReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

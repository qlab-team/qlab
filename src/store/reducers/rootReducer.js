//Reducers
import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import storeReducer from "./storeReducer";
import dialogReducer from "./dialogReducer";
import leaderboardReducer from "./leaderboardReducer";
import transactionsReducer from "./transactionsReducer";
import quizzesReducer from "./quizzesReducer";
import investmentReducer from "./investmentReducer";

//Redux
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  user: userReducer,
  dialog: dialogReducer,
  quizzes: quizzesReducer,
  quiz: quizReducer,
  store: storeReducer,
  leaderboard: leaderboardReducer,
  transactions: transactionsReducer,
  investments: investmentReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

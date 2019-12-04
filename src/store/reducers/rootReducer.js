// import authReducer from "./authReducer";
import userReducer from "./userReducer";
import quizReducer from "./quizReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  users: userReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  quiz: quizReducer
});

export default rootReducer;

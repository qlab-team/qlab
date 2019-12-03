import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Replace this with your own config details
const config = {
  apiKey: "AIzaSyAI8bN_6LTSnH1Q1N6SvPY4MULRsATNNZQ",
  projectId: "qlab-cc"
};
firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.firestore().settings({});

export default firebase;

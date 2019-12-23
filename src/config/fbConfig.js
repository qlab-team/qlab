import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD9aJpocdFwzNf7kVRQk7c0rxfXwcC2og0",
  authDomain: "qlab-cc.firebaseapp.com",
  databaseURL: "https://qlab-cc.firebaseio.com",
  projectId: "qlab-cc",
  storageBucket: "qlab-cc.appspot.com",
  messagingSenderId: "966425750434",
  appId: "1:966425750434:web:44c20f5cc3cc3b815620fb",
  measurementId: "G-HDGRZHMZDV"
};
firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase;

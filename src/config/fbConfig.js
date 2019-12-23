import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const prod_config = {
  apiKey: "AIzaSyAZ6vZoEKU8R4B4aU3Am2hfJoNDsQ8YrLo",
  authDomain: "qlab-prod.firebaseapp.com",
  databaseURL: "https://qlab-prod.firebaseio.com",
  projectId: "qlab-prod",
  storageBucket: "qlab-prod.appspot.com",
  messagingSenderId: "335728755292",
  appId: "1:335728755292:web:fcbe8ace83a0dc9e4e5c99",
  measurementId: "G-9J79QHVS3E"
};

const dev_config = {
  apiKey: "AIzaSyD9aJpocdFwzNf7kVRQk7c0rxfXwcC2og0",
  authDomain: "qlab-cc.firebaseapp.com",
  databaseURL: "https://qlab-cc.firebaseio.com",
  projectId: "qlab-cc",
  storageBucket: "qlab-cc.appspot.com",
  messagingSenderId: "966425750434",
  appId: "1:966425750434:web:44c20f5cc3cc3b815620fb",
  measurementId: "G-HDGRZHMZDV"
};

const appVersion = "DEV";

const config = appVersion === "PROD" ? prod_config : dev_config;
// const config = prod_config;
firebase.initializeApp(config);
console.log(process.env);
// firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.firestore().settings({});

export default firebase;

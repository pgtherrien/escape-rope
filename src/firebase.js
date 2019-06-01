import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDMp5EL7ReOagH6KHa_d5FGD-QLFlfEhpk",
  authDomain: "escape-rope.firebaseapp.com",
  databaseURL: "https://escape-rope.firebaseio.com",
  projectId: "escape-rope",
  storageBucket: "escape-rope.appspot.com",
  messagingSenderId: "1079288476026",
  appId: "1:1079288476026:web:62762525911793ab"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBYNNPrEhtlXA2YRbZZdDotsIgdcr7oSF4",
  authDomain: "escape-rope.firebaseapp.com",
  databaseURL: "https://escape-rope.firebaseio.com",
  projectId: "escape-rope",
  storageBucket: "escape-rope.appspot.com",
  messagingSenderId: "1079288476026",
  appId: "1:1079288476026:web:62762525911793ab"
};

var app = firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.firestore(app);
export const auth = firebase.auth();
export default firebase;

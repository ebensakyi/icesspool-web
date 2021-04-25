const { Firestore } = require("@google-cloud/firestore");
const firestore = new Firestore();
const firebase = require("firebase");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDr2HuKyVTzG-yeMaztKU0R4zp7JN9RIMw",
  authDomain: "icesspool-f37c6.firebaseapp.com",
  databaseURL: "https://icesspool-f37c6.firebaseio.com",
  projectId: "icesspool-f37c6",
  storageBucket: "icesspool-f37c6.appspot.com",
  messagingSenderId: "200856363861",
  appId: "1:200856363861:web:2711a3c3c658f21f3bc5dc"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


module.exports = firebase
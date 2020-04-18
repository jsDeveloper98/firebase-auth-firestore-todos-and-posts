import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8_eIR9j0gGwhSfU_uoHKn_SoIhBHny0o",
  authDomain: "react-firebase-auth-bb1d9.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-bb1d9.firebaseio.com",
  projectId: "react-firebase-auth-bb1d9",
  storageBucket: "react-firebase-auth-bb1d9.appspot.com",
  messagingSenderId: "1081724947252",
  appId: "1:1081724947252:web:fac39664203d0de2d3b361",
  measurementId: "G-3PHCLC0FKB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

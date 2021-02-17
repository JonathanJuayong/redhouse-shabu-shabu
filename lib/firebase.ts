import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB2Upr5Z2j9lNz-o0h9X5773H41HvU-eu8",
  authDomain: "redhouse-shabu-shabu.firebaseapp.com",
  projectId: "redhouse-shabu-shabu",
  storageBucket: "redhouse-shabu-shabu.appspot.com",
  messagingSenderId: "210733881157",
  appId: "1:210733881157:web:d024523a8a346824c1102c",
  measurementId: "G-60NZ9SPES9",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();

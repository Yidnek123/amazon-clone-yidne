import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import  "firebase/compat/firestore";
// import { initializeApp } from "firebase-admin/app";

const firebaseConfig = {
  apiKey: "AIzaSyCqCwopYfRCLb0PaEq1jbYZevmEl-GdLCo",
  authDomain: "app-37438.firebaseapp.com",
  projectId: "app-37438",
  storageBucket: "app-37438.appspot.com",
  messagingSenderId: "110891793133",
  appId: "1:110891793133:web:9c01dded7f9201727aeae4",
  measurementId: "G-BHMY3Z1189"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = app.firestore();

export { db, auth};
  


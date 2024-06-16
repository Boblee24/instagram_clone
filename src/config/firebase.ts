// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"//This is related to the database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7-62JV7Ckn4hjuGtQ08LsjdD-VhZERdQ",
  authDomain: "social-2b675.firebaseapp.com",
  projectId: "social-2b675",
  storageBucket: "social-2b675.appspot.com",
  messagingSenderId: "420509426797",
  appId: "1:420509426797:web:a20964803cf8f24d93cb64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)//This is used for authentication of user 
export const provider = new GoogleAuthProvider()// also used fro authentication in connection with google
export const database = getFirestore(app)//This is used to gave access to the create database on the firebase/firestore
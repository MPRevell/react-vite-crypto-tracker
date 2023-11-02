// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3O5BeyoXMsfrS8xcO5Bx2xO2Q830lv3E",
  authDomain: "react-crypto-app-cfb48.firebaseapp.com",
  projectId: "react-crypto-app-cfb48",
  storageBucket: "react-crypto-app-cfb48.appspot.com",
  messagingSenderId: "818593610957",
  appId: "1:818593610957:web:5446629a607ced99f87d84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const Providers = { google: new GoogleAuthProvider() };

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV2f5O2y4i_tEanXFVeqnIJgFxGPhlqpo",
  authDomain: "portfolio-a2c1a.firebaseapp.com",
  projectId: "portfolio-a2c1a",
  storageBucket: "portfolio-a2c1a.firebasestorage.app",
  messagingSenderId: "1046985205588",
  appId: "1:1046985205588:web:4ba400ba2f74121c200ac1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
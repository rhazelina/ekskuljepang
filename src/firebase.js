// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaFHSA6SK6DGyJss1cUmrDFW0zl3UBCTI",
  authDomain: "eksul-jepang.firebaseapp.com",
  projectId: "eksul-jepang",
  storageBucket: "eksul-jepang.firebasestorage.app",
  messagingSenderId: "617636599899",
  appId: "1:617636599899:web:c0bebb4d6a27edf000c77e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

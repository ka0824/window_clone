import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyDbN1rK0KUV3Zkg2jzshAFfpyqk2qIvG9c",
  authDomain: "window-clone.firebaseapp.com",
  projectId: "window-clone",
  storageBucket: "window-clone.appspot.com",
  messagingSenderId: "635283012708",
  appId: "1:635283012708:web:4e03d7c8d9ca01c050b371",
  measurementId: "G-539QTT2V37",
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const db = getFirestore(firebase);

export { firebase, db, analytics };

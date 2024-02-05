// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_OAUTH,
  authDomain: "gymproject-918be.firebaseapp.com",
  projectId: "gymproject-918be",
  storageBucket: "gymproject-918be.appspot.com",
  messagingSenderId: "866517665112",
  appId: "1:866517665112:web:2ab3c930145f258e65112d",
  measurementId: "G-FCD4DHM4Y7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

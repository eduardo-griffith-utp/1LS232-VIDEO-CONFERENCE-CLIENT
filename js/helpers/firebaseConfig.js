// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC37myrqOoz_uIjzQ8CCEElda-WjlIS84",
  authDomain: "dev5-project-2b16c.firebaseapp.com",
  projectId: "dev5-project-2b16c",
  storageBucket: "dev5-project-2b16c.appspot.com",
  messagingSenderId: "917843003465",
  appId: "1:917843003465:web:42dd1678a184c838181798",
  measurementId: "G-5KRJ4NVBMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
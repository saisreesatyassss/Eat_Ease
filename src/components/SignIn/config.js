// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC7j3NkLNg7SbKlPddmRyDoaZzZBvut70Q",
  authDomain: "eatease-6a045.firebaseapp.com",
  projectId: "eatease-6a045",
  storageBucket: "eatease-6a045.appspot.com",
  messagingSenderId: "232399188400",
  appId: "1:232399188400:web:7bbda61ab745d4b2386675",
  measurementId: "G-H1H7ZE9RRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { auth, provider };
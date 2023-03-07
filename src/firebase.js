// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, signInWithPopup, signOut, getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnlR_oXFR3cV0bDfV8_3CErJKOqckHudM",
  authDomain: "pet-purpose-app.firebaseapp.com",
  projectId: "pet-purpose-app",
  storageBucket: "pet-purpose-app.appspot.com",
  messagingSenderId: "75960408159",
  appId: "1:75960408159:web:5201af4cda03dfda7123ea"
};


const app = initializeApp(firebaseConfig);
// config the provider -- google
const provider = new GoogleAuthProvider();

const auth = getAuth(app); // get the auth object

// login logout
function login() {
    return signInWithPopup(auth, provider);
}

function logout() {
    return signOut(auth);
}

export { login, logout, auth };
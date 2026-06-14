// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv2uSL9p-ijlC-O47SxjNn28qUvq2VdII",
  authDomain: "cafofo-web.firebaseapp.com",
  projectId: "cafofo-web",
  storageBucket: "cafofo-web.firebasestorage.app",
  messagingSenderId: "192887255284",
  appId: "1:192887255284:web:8b32720cd120ef805eeea1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
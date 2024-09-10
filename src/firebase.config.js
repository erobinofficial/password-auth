// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwDvSKHVwxbl9UxIT_y7Ga1bJQ31rcoV8",
  authDomain: "password-auth-cb393.firebaseapp.com",
  projectId: "password-auth-cb393",
  storageBucket: "password-auth-cb393.appspot.com",
  messagingSenderId: "742218265583",
  appId: "1:742218265583:web:21259973ee9498c8defc1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
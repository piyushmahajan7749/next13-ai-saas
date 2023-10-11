// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHeLQjAg8KX-G-8C6QzcoTzPXXCRb3KCY",
  authDomain: "gamethinkingai.firebaseapp.com",
  projectId: "gamethinkingai",
  storageBucket: "gamethinkingai.appspot.com",
  messagingSenderId: "326653420397",
  appId: "1:326653420397:web:acb424eea68761b611b064",
  measurementId: "G-DR6QG81Z0J",
};

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

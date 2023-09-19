// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvyzys6P55jT6lUZokvdjqmdF-JjoPPZ0",
  authDomain: "autoset-ed904.firebaseapp.com",
  projectId: "autoset-ed904",
  storageBucket: "autoset-ed904.appspot.com",
  messagingSenderId: "13575657032",
  appId: "1:13575657032:web:cbbf8cc766dbe8ddb2aa7d",
  measurementId: "G-W0MTFFZSPC",
};

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

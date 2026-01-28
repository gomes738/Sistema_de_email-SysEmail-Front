// source/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlRcXGtMvgk7-c4h_ejZfTk3OhhIqTm6s",
  authDomain: "sysemail-hackaton.firebaseapp.com",
  projectId: "sysemail-hackaton",
  storageBucket: "sysemail-hackaton.firebasestorage.app",
  messagingSenderId: "401509076690",
  appId: "1:401509076690:web:ada7f92c07e74712c8a70b",
  measurementId: "G-SPPY2H1NED"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import  { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmC8N8JyFVPkRS5V9Ez6mIw1m0QHClRaQ",
  authDomain: "chat-app-a8134.firebaseapp.com",
  databaseURL:'http://chat-app-a8134.firebaseio.com',
  projectId: "chat-app-a8134",
  storageBucket: "chat-app-a8134.appspot.com",
  messagingSenderId: "227224734987",
  appId: "1:227224734987:web:9c632652a11a7ceee3a60e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage }
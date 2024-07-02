import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6f6A_90BYfCv7fqa2L-LeRsuuJ8FgSAA",
  authDomain: "discord-chat-c26eb.firebaseapp.com",
  projectId: "discord-chat-c26eb",
  storageBucket: "discord-chat-c26eb.appspot.com",
  messagingSenderId: "150003553763",
  appId: "1:150003553763:web:18c2a11709524c85063cd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY8wThkjgifGFF1O9_3UoMBP502rZlOJc",
  authDomain: "flappy-dda38.firebaseapp.com",
  projectId: "flappy-dda38",
  storageBucket: "flappy-dda38.firebasestorage.app",
  messagingSenderId: "132697591439",
  appId: "1:132697591439:web:33f503b1cac134caa1aafa",
};
const config = initializeApp(firebaseConfig);

export default config;

export const db = getFirestore(config);

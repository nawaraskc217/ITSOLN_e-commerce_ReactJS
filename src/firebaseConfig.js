
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct import for getFirestore

// Your Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

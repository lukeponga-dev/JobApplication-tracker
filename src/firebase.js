// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBY89g5U64Bc_EMecPPQqIKUUYB-HxufA4",
    authDomain: "jobtracker-firebase.firebaseapp.com",
    projectId: "jobtracker-firebase",
    storageBucket: "jobtracker-firebase.firebasestorage.app",
    messagingSenderId: "294350762752",
    appId: "1:294350762752:web:21cd4eb83bd266f291b9e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
// You can now use `db` to interact with Firestore in your components
export default app; // Export the initialized app if needed elsewhere
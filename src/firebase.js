import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBY89g5U64Bc_EMecPPQqIKUUYB",
    authDomain: "https://jobtracker-firebase.web.app/",
    projectId: "jobtracker-firebase",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "294350762752",
    appId: "294350762752"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

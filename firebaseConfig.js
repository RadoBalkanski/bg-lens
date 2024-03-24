import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZmxo6qBWrpRPzDatTRY04bfKp8OGb3eA",
    authDomain: "bglens-8cfc7.firebaseapp.com",
    databaseURL:
      "https://bglens-8cfc7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bglens-8cfc7",
    storageBucket: "bglens-8cfc7.appspot.com",
    messagingSenderId: "441776601954",
    appId: "1:441776601954:web:33dea3f5247ebf7ca7ca3b",
    measurementId: "G-YMGHHYPT9M",
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

const submit = document.getElementById("submit");

submit.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      // Example: Storing user's name and profile image URL in sessionStorage
      sessionStorage.setItem("username", userDoc.data().username);
      sessionStorage.setItem("profileImageUrl", userDoc.data().profileImageUrl);
      window.location.href = "../ProfilePage/profileIndex.html"; // Adjust as necessary
    } else {
      console.log("No user document found!");
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Login error:", errorMessage);
    // Optionally, handle errors (e.g., wrong password, no user) here
  }
});

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection, query, orderBy, onSnapshot
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered");
      console.log(user);

      sessionStorage.setItem("username", username);
      // Once the user is registered, proceed with file upload
      const file = document.getElementById("image").files[0];
      if (file) {
        const storageRef = ref(storage, file.name);
        // Upload the file to storage
        return uploadBytes(storageRef, file);
      } else {
        throw new Error("No file selected");
      }
    })
    .then((snapshot) => getDownloadURL(snapshot.ref))
.then((url) => {
  // First, save the user's profile data to Firestore with the URL
  return setDoc(doc(db, "users", auth.currentUser.uid), {
    username: username,
    profileImageUrl: url,
  }).then(() => url); // Return url for the next .then()
})
.then((url) => { // The url is now accessible in this .then()
  console.log("User profile saved");
  // Store the profile image URL in sessionStorage
  sessionStorage.setItem("profileImageUrl", url);
  // Redirect to the profile page
  window.location.href = "../ProfilePage/profileIndex.html";
})
.catch((error) => {
  console.error("Error:", error);
  alert(error.message);
});
});

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
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");

      // Get the download URL for the uploaded file
      return getDownloadURL(snapshot.ref);
    })
    .then((url) => {
      // Set the image src to the download URL
      const img = document.getElementById("myimg");
      img.setAttribute("src", url);
      console.log("Download URL:", url);

      sessionStorage.setItem("profileImageUrl", url);
      // Redirect to the next page after successful registration and upload
      // Replace "nextPage.html" with the URL of the next page you want to navigate to
      window.location.href = "../ProfilePage/profileIndex.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
});

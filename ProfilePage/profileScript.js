import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const searchBarContainerEl = document.querySelector(".search-bar-container");

const magnifierEl = document.querySelector(".magnifier");

magnifierEl.addEventListener("click", () => {
  searchBarContainerEl.classList.toggle("active");
});

const user = auth.currentUser;
if (user !== null) {
  user.providerData.forEach((profile) => {
    const userNameElement = document.getElementById("userName");
    if (userNameElement) {
      userNameElement.innerText = profile.displayName || "";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the profile image URL from sessionStorage
  const profileImageUrl = sessionStorage.getItem("profileImageUrl");
  const profileImageUrl1 = sessionStorage.getItem("profileImageUrl");
  if (profileImageUrl) {
    // Set the profile image source
    const profileImgElement = document.querySelector(".profile-img img");
    const profileImgElement1 = document.querySelector(".post-img img");
    profileImgElement.setAttribute("src", profileImageUrl);
    profileImgElement1.setAttribute("src", profileImageUrl1);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const username = sessionStorage.getItem("username");

  console.log("Retrieved username from session storage:", username); // Debug

  if (username) {
    console.log("Username found in sessionStorage."); // Debug
    document.getElementById("userName").textContent = username;
    console.log("Username set in DOM:", username); // Debug
  } else {
    console.log("Username not found in sessionStorage."); // Debug
  }
});

window.addEventListener("DOMContentLoaded", function () {
  var photos = sessionStorage.getItem("capturedPhoto");
  if (photos) {
    var photoArray = photos.split("|");
    var container = document.getElementById("postedPhotosContainer");
    photoArray.forEach(function (photoUrl) {
      if (photoUrl !== "") {
        var newImg = document.createElement("img");
        newImg.src = photoUrl;
        container.appendChild(newImg);

        document.querySelector(".post-info").style.display = "block";
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, now fetch their profile data
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // Set user data in the DOM
            document.getElementById("userName").textContent = userData.username;
            document
              .querySelector(".profile-img img")
              .setAttribute("src", userData.profileImageUrl);
          } else {
            console.log("No user data found!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      // User is signed out
      console.log("No user is signed in.");
      // Optionally, redirect to login page
      // window.location.href = "login.html";
    }
  });
});

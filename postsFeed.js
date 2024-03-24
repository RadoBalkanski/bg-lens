import { db } from "./firebaseConfig.js";
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export function loadRealTimePosts() {
  const postsContainer = document.getElementById("postsContainer"); // Ensure this exists in your HTML

  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

  onSnapshot(q, (querySnapshot) => {
    postsContainer.innerHTML = ''; // Optionally clear existing posts to always have fresh feed on page load/reload
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postElement = createPostElement(post.imageUrl, post.caption); // Ensure this function generates the post element correctly
      postsContainer.prepend(postElement); // This should ensure the newest posts are at the top
    });
  });
}

function createPostElement(imageUrl, caption) {
    const postDiv = document.createElement("div");
    postDiv.innerHTML = `
      <img src="${imageUrl}" alt="Post image">
      <p>${caption}</p>
    `;
    return postDiv;
  }

import { db } from "./firebaseConfig.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export async function uploadPost(file, caption) {
  const storage = getStorage();
  const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
  
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);

  await addDoc(collection(db, "posts"), {
    imageUrl: url,
    caption: caption,
    timestamp: serverTimestamp(),
  });

  console.log("Post uploaded");
}
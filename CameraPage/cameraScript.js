
import { db, app } from '../firebaseConfig.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { uploadPost } from '../postUpload.js';
(function() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    var downloadbutton = null;
    var retakebutton = null;
    var postToFeedButton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        downloadbutton = document.getElementById('downloadbutton');
        retakebutton = document.getElementById('retakebutton');
        postToFeedButton = document.getElementById('postToFeedButton');

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });

        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.width = video.videoWidth; 
                canvas.height = video.videoHeight; 
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        downloadbutton.addEventListener('click', function() {
            downloadPhoto();
        });

        retakebutton.addEventListener('click', function() {
            retakePhoto();
        });

        postToFeedButton.addEventListener('click', function() {
            postToFeed();
        });
        clearphoto();
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = video.videoWidth; 
            canvas.height = video.videoHeight; 
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); 
            photo.src = canvas.toDataURL('image/png');
            photo.style.display = 'block';
            downloadbutton.style.display = 'inline-block';
            retakebutton.style.display = 'inline-block';
            video.style.display = 'none';
            startbutton.style.display = 'none';

            var capturedPhotoUrl = canvas.toDataURL('image/png');
            sessionStorage.setItem("capturedPhoto", capturedPhotoUrl);

            postToFeedButton.style.display = 'inline-block'; 
            
            postToFeed(capturedPhotoUrl);
        } else {
            clearphoto();
        }
    }

    function retakePhoto() {
        photo.style.display = 'none';
        downloadbutton.style.display = 'none';
        retakebutton.style.display = 'none';
        video.style.display = 'block';
        startbutton.style.display = 'inline-block';
    }

    function downloadPhoto() {
        var dataUrl = canvas.toDataURL('image/png');

        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'webcam_photo.png';

        a.click();
    }

    

    async function postToFeed(capturedPhotoUrl) {
        // Convert Data URL to Blob
        const response = await fetch(capturedPhotoUrl);
        const blob = await response.blob();
        const file = new File([blob], "capturedImage.png", { type: "image/png" });
        const caption = "Optional caption here"; // Modify based on your needs
    
        // Call uploadPost to upload the image and post data
        try {
            await uploadPost(file, caption);
            console.log("Image posted successfully.");
        } catch (error) {
            console.error("Error posting image:", error);
        }
    }

    document.getElementById('postToFeedButton').addEventListener('click', function() {
        const photo = document.getElementById('photo');
        if (photo.src) {
            postToFeed(photo.src);
        }
    });

    

    window.addEventListener('load', startup, false);
})();

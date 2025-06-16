
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMtCR_Q0Y88ygk6rJo2Kkbaqx2eNT7pGE",
  authDomain: "galeryusaha-cloud.firebaseapp.com",
  projectId: "galeryusaha-cloud",
  storageBucket: "galeryusaha-cloud.firebasestorage.app",
  messagingSenderId: "790642050570",
  appId: "1:790642050570:web:928ddb42ff56c239c341f3",
  measurementId: "G-Q13NGX74LD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//Slide Show 

const images = [
  "images/umkm1.png",
  "images/Foto1.jpg",
  "images/Foto2.jpg",
  "images/Foto3.jpg"
];
let index = 0;
const slideshow = document.getElementById("slideshow");

setInterval(() => {
  // Fade out
  slideshow.classList.add("fade-out");

  setTimeout(() => {
    // Ganti gambar setelah fade out
    index = (index + 1) % images.length;
    slideshow.src = images[index];

    // Fade in
    slideshow.classList.remove("fade-out");
  }, 1000); // waktu fade-out: 1 detik
}, 5000); // ganti setiap 10 detik

// Navbar 

// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJr6zyzkq-b-XtpeneDig4tEKFdUZ1SB0",
  authDomain: "galeriumkm-af9c7.firebaseapp.com",
  projectId: "galeriumkm-af9c7",
  storageBucket: "galeriumkm-af9c7.appspot.com",
  messagingSenderId: "579650900137",
  appId: "1:579650900137:web:7107247bed6785b4e999b8",
  measurementId: "G-MRYJ0YY6LW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot
};
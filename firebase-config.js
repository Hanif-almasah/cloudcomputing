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
  apiKey: "AIzaSyDjiyo56i6IQSXoVFM-WdVkk40mmjOr7h4",
  authDomain: "cloudcomputing-galery.firebaseapp.com",
  projectId: "cloudcomputing-galery",
  storageBucket: "cloudcomputing-galery.firebasestorage.app",
  messagingSenderId: "737145300409",
  appId: "1:737145300409:web:3c9899da358e18bfe48268"
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
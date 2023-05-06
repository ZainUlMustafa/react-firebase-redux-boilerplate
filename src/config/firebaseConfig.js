import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import functions from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAwbjKSfD_rFJkcMGd8C-UnvK6xctKV4LQ",
  authDomain: "sris-a8c0c.firebaseapp.com",
  projectId: "sris-a8c0c",
  storageBucket: "sris-a8c0c.appspot.com",
  messagingSenderId: "569087864283",
  appId: "1:569087864283:web:c15ff1e86ed23afe508bfe",
  measurementId: "G-1YJ0E2L4SV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const cloudFunction = firebase.functions();


export { storage, cloudFunction, firebase as default };
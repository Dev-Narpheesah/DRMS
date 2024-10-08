// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAeTnNM7ucuIASeezDJg7ESV_GwfjrrZ80",
  authDomain: "drms-b663f.firebaseapp.com",
  projectId: "drms-b663f",
  storageBucket: "drms-b663f.appspot.com",
  messagingSenderId: "23807093988",
  appId: "1:23807093988:web:2aa04dcbb1420e7ef890f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase = getStorage(app)
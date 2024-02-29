import { initializeApp } from "firebase/app"
import { getFireStore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC86CXlAovpZap0HOyvuNwUEaiyg_L-9G8",
  authDomain: "house-marketplace-web-ea80d.firebaseapp.com",
  projectId: "house-marketplace-web-ea80d",
  storageBucket: "house-marketplace-web-ea80d.appspot.com",
  messagingSenderId: "322309498449",
  appId: "1:322309498449:web:05c0e8e58891992d1bba70"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFireStore()
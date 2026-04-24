import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA9dK3x3_uwFOPAGYvWozcWDt60dSMEfhk",
  authDomain: "mazarfinishing.firebaseapp.com",
  projectId: "mazarfinishing",
  storageBucket: "mazarfinishing.firebasestorage.app",
  messagingSenderId: "345785466349",
  appId: "1:345785466349:web:393f5442c9769e8d4b3be4",
  measurementId: "G-2N3YFWLVM3"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

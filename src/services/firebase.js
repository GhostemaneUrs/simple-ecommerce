import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAwTDXe341yu4pCvQOAcArp3enw2PZ9Ats',
  authDomain: 'simple-ecommerce-c0178.firebaseapp.com',
  projectId: 'simple-ecommerce-c0178',
  storageBucket: 'simple-ecommerce-c0178.appspot.com',
  messagingSenderId: '722018592278',
  appId: '1:722018592278:web:b86b7084d37baa14817737'
}
// Initialize Firebase
export const firebase = initializeApp(firebaseConfig)
export const auth = getAuth(firebase)
export const db = getFirestore(firebase)
export const storage = getStorage(firebase)

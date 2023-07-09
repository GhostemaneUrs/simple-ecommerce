import { db } from '../services/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const saveUser = async user => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid
    })
  } catch (error) {
    Error(error)
  }
}

export const getUser = async uid => {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
  } catch (error) {
    Error(error)
  }
}

export const verifyUser = async uid => {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    }
  } catch (error) {
    Error(error)
  }
}

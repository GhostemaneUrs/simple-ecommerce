import Swal from 'sweetalert2'
import { auth } from '../../services/firebase'
import { createSlice } from '@reduxjs/toolkit'
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { getUser, saveUser } from '../../utils/firebaseFunctions'

const initialState = {
  loading: false,
  credentials: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCredentials: (state, action) => {
      state.credentials = action.payload
    }
  }
})

export const { setLoading, setCredentials } = authSlice.actions

export const logout = () => async dispatch => {
  try {
    dispatch(setLoading(true))
    await signOut(auth)
    dispatch(setCredentials({}))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(setLoading(false))
  }
}

export const signIn = (email, password, callback) => async dispatch => {
  try {
    dispatch(setLoading(true))
    const currentUser = await signInWithEmailAndPassword(auth, email, password)
    if (!currentUser) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
    const { user } = currentUser
    getUser(user.uid).then(res => {
      if (res) {
        dispatch(setCredentials(res))
      }
    })
    if (callback) callback()
    dispatch(setLoading(false))
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      Swal.fire({
        timer: 1500,
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        text: 'Incorrect email address or password'
      })
    } else {
      Swal.fire({
        timer: 1500,
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        text: 'Could not log in, try again'
      })
    }
    dispatch(setLoading(false))
  }
}

export const signUp = (email, password, callback) => async dispatch => {
  try {
    dispatch(setLoading(true))
    const newUser = await createUserWithEmailAndPassword(auth, email, password)
    if (!newUser) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
    const { user } = newUser
    saveUser({
      uid: user.uid
    })
    dispatch(setLoading(false))
    if (callback) callback()
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        text: 'E-mail is already in use'
      })
    } else {
      Swal.fire({
        timer: 1500,
        icon: 'error',
        title: 'Oops...',
        showConfirmButton: false,
        text: 'User could not be created'
      })
    }
    dispatch(setLoading(false))
  }
}

export default authSlice.reducer

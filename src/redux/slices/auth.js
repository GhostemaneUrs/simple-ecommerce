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

export const signIn = (email, password) => async dispatch => {
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
    dispatch(setLoading(false))
  } catch (error) {
    console.log(error)
    dispatch(setLoading(false))
  }
}

export const signUp = (email, password) => async dispatch => {
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
    }).then(() => {
      console.log('User saved')
    })
  } catch (error) {
    console.log(error)
    dispatch(setLoading(false))
  }
}

export default authSlice.reducer

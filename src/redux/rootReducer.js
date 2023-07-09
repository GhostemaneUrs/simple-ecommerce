import { combineReducers } from '@reduxjs/toolkit'
import auth from './slices/auth'

const rootReducer = combineReducers({
  auth
})

export default rootReducer

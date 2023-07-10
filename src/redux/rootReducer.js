import auth from './slices/auth'
import ecommerce from './slices/ecommerce'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  auth: auth,
  ecommerce: ecommerce
})

export default rootReducer

import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: true
})

export const persistor = persistStore(store)

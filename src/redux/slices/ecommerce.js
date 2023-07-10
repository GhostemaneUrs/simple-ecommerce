import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  products: {}
}

export const ecommerceSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    }
  }
})

export const { setLoading, setProducts } = ecommerceSlice.actions

export const getProducts = () => async dispatch => {
  try {
    dispatch(setLoading(true))
    await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        res.json().then(data => {
          dispatch(setProducts(data))
          dispatch(setLoading(false))
        })
      })
      .catch(err => {
        dispatch(setLoading(false))
      })
  } catch (error) {
    dispatch(setLoading(false))
  }
}

export default ecommerceSlice.reducer

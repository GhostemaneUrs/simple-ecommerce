import { Fragment } from 'react'
import SignIn from './sign-in'
import SignUp from './sign-up'
import Ecommerce from './ecommerce'
import { Routes, Route } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/ecommerce' element={<Ecommerce />} />
      </Routes>
    </Fragment>
  )
}

export default AppRouter

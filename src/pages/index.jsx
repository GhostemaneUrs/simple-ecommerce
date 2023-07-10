import { Fragment } from 'react'
import SignIn from './sign-in'
import SignUp from './sign-up'
import Ecommerce from './ecommerce'
import { Routes, Route } from 'react-router-dom'
import {
  ProtectedRoute,
  ProtectedRouteAuth
} from '../components/ProtectedRoutes'
import { Layout } from '../components/layout'

const AppRouter = () => {
  return (
    <Fragment>
      <Layout>
        <Routes>
          <Route element={<ProtectedRouteAuth />}>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/ecommerce' element={<Ecommerce />} />
          </Route>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Layout>
    </Fragment>
  )
}

export default AppRouter

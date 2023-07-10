import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ redirectTo = '/' }) => {
  const { credentials } = useSelector(state => state.auth)
  if (!credentials?.accessToken) {
    return <Navigate to={redirectTo} />
  }
  return <Outlet />
}

export const ProtectedRouteAuth = ({ redirectTo = '/ecommerce' }) => {
  const { credentials } = useSelector(state => state.auth)
  if (credentials?.accessToken) {
    return <Navigate to={redirectTo} />
  }
  return <Outlet />
}

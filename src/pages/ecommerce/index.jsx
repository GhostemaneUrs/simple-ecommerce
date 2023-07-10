import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/slices/ecommerce'

const Ecommerce = () => {
  const dispatch = useDispatch()
  const { credentials } = useSelector(state => state.auth)
  const { products, loading } = useSelector(state => state.ecommerce)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return <div>Ecommerce</div>
}

export default Ecommerce

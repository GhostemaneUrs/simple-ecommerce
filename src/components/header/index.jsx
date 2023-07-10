import React from 'react'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { ImExit } from 'react-icons/im'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { logout } from '../../redux/slices/auth'

export const Header = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.container_header}>
      <div className='container-1440'>
        <div className={styles.container_header_content}>
          <div className={styles.container_logo}>
            {/* <img src={logo} alt='logo' className={styles.logo} /> */}
          </div>
          <div className={styles.container_menu}>
            <AiOutlineShoppingCart />
            <ImExit
              onClick={() => {
                dispatch(logout())
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

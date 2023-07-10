import React from 'react'
import { Header } from '../Header'
import styles from './styles.module.scss'
import { useLocation } from 'react-router-dom'

export const Layout = ({ children }) => {
  const location = useLocation()
  const { pathname } = location
  return (
    <div className={styles.container_layout}>
      {pathname !== '/' && pathname !== '/sign-up' && <Header />}
      <main className={`${styles.container_main} `}>{children}</main>
    </div>
  )
}

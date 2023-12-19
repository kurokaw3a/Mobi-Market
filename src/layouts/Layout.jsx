import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logoutIcon from '../assets/sidebarIcons/logout 01.svg'
import Button from '../components/UI/Button/Button'
import Header from '../components/UI/Header/Header'
import { Modal } from '../components/UI/Modal/Modal'
import Sidebar from '../components/UI/Sidebar/Sidebar'
import styles from './Layout.module.css'

const Layout = () => {
  const location = useLocation().pathname.slice(1)
  const [logoutModal, setLogoutModal] = useState(false)
  const showLogoutModal = () => {
    setLogoutModal(true)
  }
  const hideLogoutModal = () => {
    setLogoutModal(false)
  }
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('login')
    navigate('/')
    window.location.reload()
  }
  const { username, email } = useSelector((state) => state.Auth.login)
  return (
    <div className={styles.container}>
      <Sidebar logout={showLogoutModal} name={username} email={email} />
      <div className={styles.left}>
        <Header
          variant='navigation'
          location={location === 'profile' && 'Профиль'}
        />
        <Outlet />
      </div>
      {logoutModal && (
        <Modal onClose={hideLogoutModal}>
          <div className={styles.logout}>
            <img className={styles.logoutIcon} src={logoutIcon} alt='error' />
            <p className={styles.logoutText}>
              Вы действительно хотите выйти с аккаунта?
            </p>
            <Button onClick={logout} variant='actions'>
              Выйти
            </Button>
            <p onClick={hideLogoutModal} className={styles.cancell}>
              Отмена
            </p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Layout

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import logoutIcon from '../assets/sidebarIcons/logout 01.svg'
import Button from '../components/UI/Button/Button'
import Header from '../components/UI/Header/Header'
import { Modal } from '../components/UI/Modal/Modal'
import Sidebar from '../components/UI/Sidebar/Sidebar'
import { getUserProfile } from '../services/Authorization/AuthActions'
import styles from './Layout.module.css'

const Layout = () => {
  const { login, profile } = useSelector((state) => state.Auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [])
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
  const disabled =
    profile?.first_name !== '' &&
    profile?.last_name !== '' &&
    profile?.birth_date
  return (
    <div className={styles.container}>
      <Sidebar
        disabled={disabled}
        logout={showLogoutModal}
        name={login?.username}
        email={login?.email}
        avatar={profile?.photo}
      />
      <div className={styles.left}>
        <Header
          variant='navigation'
          location={
            (location === 'profile' && 'Профиль') ||
            (location === 'liked-products' && 'Понравившиеся') ||
            (location === 'my-products' && 'Мои товары')
          }
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

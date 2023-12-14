import { NavLink, useNavigate } from 'react-router-dom'
import profileIcon from '../../../assets/headerIcons/profileIcon.svg'
import arrowIcon from '../../../assets/sidebarIcons/arrowIcon.svg'
import likeIcon from '../../../assets/sidebarIcons/like.svg'
import logoutIcon from '../../../assets/sidebarIcons/logoutIcon.svg'
import productsIcon from '../../../assets/sidebarIcons/productsIcon.svg'
import styles from './Sidebar.module.css'

const Sidebar = ({ logout, name, nickname, avatar }) => {
  const navigate = useNavigate()
  const navToProfile = () => {
    navigate('/profile')
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div onClickCapture={navToProfile} className={styles.profile}>
          <img
            className={styles.profileIcon}
            src={avatar || profileIcon}
            alt='error'
          />
          <div>
            <h2 className={styles.userName}>{name}</h2>
            <h3 className={styles.userNickname}>{nickname}</h3>
          </div>
        </div>
        <div className={styles.navigation}>
          <NavLink to='/liked-products' className={styles.navText}>
            <div className={styles.nav}>
              <div className={styles.navLeft}>
                <img className={styles.navIcon} src={likeIcon} alt='error' />
                <h3 className={styles.navText}>Понравившиеся</h3>
              </div>
              <img src={arrowIcon} alt='error' />
            </div>
          </NavLink>
          <NavLink to='/my-products' className={styles.navText}>
            <div className={styles.nav}>
              <div className={styles.navLeft}>
                <img
                  className={styles.navIcon}
                  src={productsIcon}
                  alt='error'
                />
                <h3 className={styles.navText}>Мои товары</h3>
              </div>
              <img src={arrowIcon} alt='error' />
            </div>
          </NavLink>
          <div onClickCapture={logout} className={styles.navLogout}>
            <div className={styles.navLeft}>
              <img className={styles.navIcon} src={logoutIcon} alt='error' />
              <h3 className={styles.navText}>Выйти</h3>
            </div>
            <img src={arrowIcon} alt='error' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
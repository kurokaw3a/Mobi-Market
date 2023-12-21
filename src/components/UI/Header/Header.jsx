import { NavLink } from 'react-router-dom'
import arrowLeftIcon from '../../../assets/headerIcons/arrowLeft.svg'
import marketIcon from '../../../assets/headerIcons/marketIcon.svg'
import profileIcon from '../../../assets/headerIcons/profileIcon.svg'
import Button from '../Button/Button'
import styles from './Header.module.css'

const Header = ({ variant, avatar, location, username, email }) => {
  return variant !== 'navigation' ? (
    <header>
      <nav className={styles.nav}>
        <img className={styles.marketIcon} src={marketIcon} alt='error' />
        <div className={styles.rightBlock}>
          <Button variant='announcement'>Подать объявление</Button>
          <div className={styles.profile}>
            <div>
              <h2 className={styles.userName}>{username}</h2>
              <h3 className={styles.userNickname}>{email}</h3>
            </div>
            <NavLink to='/profile'>
              <img
                className={styles.profileIcon}
                src={profileIcon || avatar}
                alt='error'
              />
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  ) : (
    <header className={styles.navigation}>
      <nav className={styles.navigationLeftBlock}>
        <NavLink to={-1}>
          <div className={styles.navigationBackIcon}>
            <img src={arrowLeftIcon} alt='error' />
          </div>
        </NavLink>
        <p className={styles.navigationText}>Назад</p>
      </nav>
      <h2 className={styles.pathname}>{location}</h2>
    </header>
  )
}

export default Header

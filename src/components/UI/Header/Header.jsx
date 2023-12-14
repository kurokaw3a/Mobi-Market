import { NavLink } from 'react-router-dom'
import arrowLeftIcon from '../../../assets/headerIcons/arrowLeft.svg'
import marketIcon from '../../../assets/headerIcons/marketIcon.svg'
import profileIcon from '../../../assets/headerIcons/profileIcon.svg'
import Button from '../Button/Button'
import styles from './Header.module.css'

const Header = ({ variant }) => {
  return variant !== 'navigation' ? (
    <header>
      <nav className={styles.nav}>
        <img className={styles.marketIcon} src={marketIcon} alt='error' />
        <div className={styles.rightBlock}>
          <Button variant='announcement'>Подать объявление</Button>
          <div className={styles.profile}>
            <div>
              <h2 className={styles.userName}>Name</h2>
              <h3 className={styles.userNickname}>Nickname</h3>
            </div>
            <img className={styles.profileIcon} src={profileIcon} alt='error' />
          </div>
        </div>
      </nav>
    </header>
  ) : (
    <div className={styles.navigation}>
      <div className={styles.navigationLeftBlock}>
        <NavLink to={-1}>
          <div className={styles.navigationBackIcon}>
            <img src={arrowLeftIcon} alt='error' />
          </div>
        </NavLink>
        <p className={styles.navigationText}>Назад</p>
      </div>
      <h2 className={styles.pathname}>Мои товары</h2>
    </div>
  )
}

export default Header

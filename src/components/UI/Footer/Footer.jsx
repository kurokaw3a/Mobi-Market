import { useDispatch } from 'react-redux'
import arrowIcon from '../../../assets/footerIcons/arrowIcon.svg'
import { MarketSlice } from '../../../services/Market/MarketSlice'
import styles from './Footer.module.css'

const Footer = ({ pages, setPage, page }) => {
  const dispatch = useDispatch()
  const nextPage = () => {
    if (page >= 1 && page < pages.length) {
      setPage((prev) => prev + 1)
      dispatch(MarketSlice.actions.reset())
    }
  }
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
      dispatch(MarketSlice.actions.reset())
    }
  }
  const currentPage = (page) => {
    setPage(page)
    dispatch(MarketSlice.actions.reset())
  }
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <div onClickCapture={prevPage} className={styles.navTools}>
          {page > 1 && (
            <img className={styles.arrowIconBack} src={arrowIcon} alt='error' />
          )}
        </div>
        {pages?.map((el, i) => (
          <div
            key={el}
            onClickCapture={() => currentPage(i + 1)}
            className={
              page === i + 1
                ? styles.pageNumberActive
                : styles.pageNumberDisabled
            }
          >
            {i + 1}
          </div>
        ))}
        <div onClickCapture={nextPage} className={styles.navTools}>
          {page < pages.length && (
            <img className={styles.arrowIcon} src={arrowIcon} alt='error' />
          )}
        </div>
      </nav>
    </footer>
  )
}

export default Footer

import arrowIcon from '../../../assets/footerIcons/arrowIcon.svg'
import styles from './Footer.module.css'

const Footer = ({ pages, setPage, page }) => {
  const nextPage = () => {
    if (page >= 1 && page < pages.length) {
      setPage((prev) => prev + 1)
    }
  }
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }
  const currentPage = (page) => {
    setPage(page)
  }
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <div onClickCapture={prevPage} className={styles.navTools}>
          {page > 1 && (
            <img className={styles.arrowIconBack} src={arrowIcon} alt='error' />
          )}
        </div>
        {pages?.map((el) => (
          <div
            onClickCapture={() => currentPage(el)}
            className={
              page === el ? styles.pageNumberActive : styles.pageNumberDisabled
            }
          >
            {el}
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
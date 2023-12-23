/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import snackIcon from '../../../assets/snackbarIcons/snackIcon.svg'
import styles from './Snackbar.module.css'

const Snackbar = ({ children, variant, yes, no }) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    if (variant !== 'clarification')
      setTimeout(() => {
        setShow(false)
      }, 3000)
  }, [])
  return (
    show && (
      <div
        className={
          (variant === 'error' && styles.errorSnackbar) ||
          (variant === 'success' && styles.successSnackbar) ||
          (variant === 'clarification' && styles.clarification)
        }
      >
        {variant === 'error' && (
          <img className={styles.snackbarIcon} src={snackIcon} alt='error' />
        )}
        {variant === 'success' && (
          <img className={styles.snackbarIcon} src={snackIcon} alt='error' />
        )}
        {children}
        {variant === 'clarification' && (
          <div className={styles.clarificationText}>
            <p onClick={yes} className={styles.yes}>
              Да
            </p>
            <p onClick={no} className={styles.no}>
              Нет
            </p>
          </div>
        )}
      </div>
    )
  )
}

export default Snackbar

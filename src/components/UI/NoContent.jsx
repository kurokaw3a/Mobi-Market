import noContentIcon from '../../assets/noContent.svg'
import styles from './NoContent.module.css'

const NoContent = () => {
  return (
    <div className={styles.container}>
      <img className={styles.icon} src={noContentIcon} alt='error' />
      <h2 className={styles.text}>Ой пусто!</h2>
    </div>
  )
}

export default NoContent

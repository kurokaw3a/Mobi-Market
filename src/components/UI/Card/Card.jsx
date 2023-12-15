import { useState } from 'react'
import actionsIcon from '../../../assets/cardIcons/actions.svg'
import deleteIcon from '../../../assets/cardIcons/deleteIcon.svg'
import editIcon from '../../../assets/cardIcons/editIcon.svg'
import likeIcon from '../../../assets/cardIcons/heart.svg'
import styles from './Card.module.css'

const Card = ({ img, title, price, likes, id }) => {
  const [show, setShow] = useState(false)
  const showActions = () => {
    setShow((prev) => !prev)
  }
  return (
    <div id={id} className={styles.card}>
      <img className={styles.image} src={img} alt='error' />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.price}>{price} $</p>
      <div className={styles.actionsBlock}>
        <div className={styles.likeBlock}>
          <img className={styles.likeIcon} src={likeIcon} alt='error' />
          <p className={styles.likeCount}>{likes}</p>
        </div>
        <img
          onClick={showActions}
          className={styles.actionsIcon}
          src={actionsIcon}
          alt='error'
        />
      </div>
      {show && (
        <>
          <div onClickCapture={showActions} className={styles.backdrop} />
          <div className={styles.actions}>
            <div className={styles.action}>
              <img className={styles.actionIcon} src={editIcon} alt='error' />
              <p className={styles.actionText}>Изменить</p>
            </div>
            <hr className={styles.actionLine} />
            <div className={styles.action}>
              <img className={styles.actionIcon} src={deleteIcon} alt='error' />
              <p className={styles.actionText}>Удалить</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Card

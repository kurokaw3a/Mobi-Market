import { useState } from 'react'
import actionsIcon from '../../../assets/cardIcons/actions.svg'
import deleteIcon from '../../../assets/cardIcons/deleteIcon.svg'
import editIcon from '../../../assets/cardIcons/editIcon.svg'
import likeIcon from '../../../assets/cardIcons/heart.svg'
import likeIconGray from '../../../assets/cardIcons/heartGray.svg'
import styles from './Card.module.css'

const Card = ({
  img,
  title,
  price,
  likes,
  id,
  variant,
  liked,
  like,
  unlike,
  currentProduct,
  onEdit,
  onDelete,
}) => {
  const [show, setShow] = useState(false)
  const showActions = () => {
    setShow((prev) => !prev)
  }
  return (
    <div id={id} className={styles.card}>
      <div className={styles.productInfo}>
        <img
          onClick={currentProduct}
          className={styles.image}
          src={img}
          alt='error'
        />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.price}>{price.toFixed()} $</p>
      </div>
      <div className={styles.actionsBlock}>
        <div className={styles.likeBlock}>
          <img
            onClick={liked ? unlike : like}
            className={styles.likeIcon}
            src={liked ? likeIcon : likeIconGray}
            alt='error'
          />
          <p className={styles.likeCount}>{likes}</p>
        </div>
        {variant === 'my' && (
          <img
            onClick={showActions}
            className={styles.actionsIcon}
            src={actionsIcon}
            alt='error'
          />
        )}
      </div>
      {show && (
        <>
          <div onClickCapture={showActions} className={styles.backdrop} />
          <div className={styles.actions}>
            <div onClickCapture={onEdit} className={styles.action}>
              <img className={styles.actionIcon} src={editIcon} alt='error' />
              <p className={styles.actionText}>Изменить</p>
            </div>
            <hr className={styles.actionLine} />
            <div onClickCapture={onDelete} className={styles.action}>
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

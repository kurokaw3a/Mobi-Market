import likeIcon from '../../assets/cardIcons/heart.svg'
import likeIconGray from '../../assets/cardIcons/heartGray.svg'
import closeIcon from '../../assets/closeIcon.svg'
import Loader from '../UI/Lodaer/Loader'
import { Modal } from '../UI/Modal/Modal'
import styles from './CurrentProduct.module.css'

const CurrentProduct = ({
  onClose,
  name,
  status,
  images,
  price,
  number,
  likes,
  shortDescription,
  fullDescription,
  id,
  liked,
  index,
  nexPhoto,
}) => {
  return (
    <Modal onClose={onClose} variant='product'>
      {status === 'pending' ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.container} key={id}>
          <div className={styles.closeBlock}>
            <img
              onClick={onClose}
              className={styles.closeIcon}
              src={closeIcon}
              alt='error'
            />
          </div>
          <div>
            {images?.map(
              (el, i) =>
                i === index && (
                  <img
                    key={el}
                    className={styles.img}
                    src={el.image}
                    alt='error'
                  />
                )
            )}
            {images?.length > 1 && (
              <div className={styles.radios}>
                {images.map((el, i) => (
                  <input
                    key={el.id}
                    onClick={() => nexPhoto(i)}
                    type='radio'
                    checked={i === index}
                    className={i === index ? styles.radioCurrent : styles.radio}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={styles.info}>
            <h1 className={styles.price}>{price.toFixed()} $</h1>
            <p className={styles.number}>{number}</p>
            <div className={styles.likeBlock}>
              <img
                className={styles.likeIcon}
                src={liked ? likeIcon : likeIconGray}
                alt='error'
              />
              <p className={styles.likeText}>Нравится: {likes} M</p>
            </div>
          </div>
          <div className={styles.feature}>
            <div className={styles.short}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.description}>{shortDescription}</p>
            </div>
            <div className={styles.full}>
              <h3 className={styles.descriptionText}>Детальное описание</h3>
              <p className={styles.description}>{fullDescription}</p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default CurrentProduct

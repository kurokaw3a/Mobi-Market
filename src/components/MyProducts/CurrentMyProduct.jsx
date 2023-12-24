import closeIcon from '../../assets/closeIcon.svg'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Loader from '../UI/Lodaer/Loader'
import { Modal } from '../UI/Modal/Modal'
import styles from './CurrentMyProduct.module.css'

const CurrentMyProduct = ({
  onClose,
  name,
  status,
  images,
  price,
  shortDescription,
  fullDescription,
  id,
  index,
  nexPhoto,
  onEdit,
  onDelete,
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
            <div className={styles.input}>
              <Input
                disabled
                value={`${price.toFixed()} $`}
                variant='overview'
              />
            </div>
            <div className={styles.input}>
              <Input disabled value={name} variant='overview' />
            </div>
            <div className={styles.input}>
              <Input disabled value={shortDescription} variant='overview' />
            </div>
            <div className={styles.inputFull}>{fullDescription}</div>
          </div>
          <div className={styles.buttons}>
            <Button onClick={onEdit} variant='actions'>
              Редактировать
            </Button>
            <div onClickCapture={onDelete} className={styles.deleteButton}>
              Удалить
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default CurrentMyProduct

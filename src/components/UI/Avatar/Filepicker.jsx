import { useRef } from 'react'
import imageAddIcon from '../../../assets/filepickerIcons/image-add.svg'
import trashIcon from '../../../assets/filepickerIcons/trash.svg'
import avatarIcon from '../../../assets/headerIcons/profileIcon.svg'
import styles from './Filepicker.module.css'

const Filepicker = ({ variant, file, setFile, onDelete }) => {
  const fileRef = useRef(null)

  const selectFile = (event) => {
    const fileUrl = URL.createObjectURL(event.target.files[0])
    setFile(fileUrl)
  }

  return (
    <div>
      {variant === 'product' && file ? (
        <div>
          <img
            onClick={onDelete}
            className={styles.trashIcon}
            src={trashIcon}
            alt='error'
          />
          <img
            onClick={() => fileRef.current.click()}
            className={styles.product}
            src={file}
            alt='error'
          />
        </div>
      ) : (
        <div
          onClickCapture={() => fileRef.current.click()}
          className={
            (variant === 'avatar' && styles.avatar) ||
            (variant === 'product' && styles.product)
          }
        >
          <img
            className={
              (variant === 'avatar' && styles.avatarIcon) ||
              (variant === 'product' && styles.productIcon)
            }
            src={
              file ||
              (variant === 'avatar' && avatarIcon) ||
              (variant === 'product' && imageAddIcon)
            }
            alt='error'
          />
          <p
            className={
              (variant === 'avatar' && styles.pickAvatarImage) ||
              (variant === 'product' && styles.pickProductImage)
            }
          >
            {(variant === 'avatar' && 'Выбрать фотографию') ||
              (variant === 'product' && 'Добавить фото')}
          </p>
        </div>
      )}
      <input
        onChange={selectFile}
        className={styles.fileInput}
        type='file'
        ref={fileRef}
      />
    </div>
  )
}

export default Filepicker

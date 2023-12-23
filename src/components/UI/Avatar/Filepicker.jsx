import { useRef } from 'react'
import imageAddIcon from '../../../assets/filepickerIcons/image-add.svg'
import trashIcon from '../../../assets/filepickerIcons/trash.svg'
import avatarIcon from '../../../assets/headerIcons/profileIcon.svg'
import styles from './Filepicker.module.css'

const Filepicker = ({
  variant,
  file,
  setFile,
  onDelete,
  setFiles,
  files,
  setFormData,
}) => {
  const fileRef = useRef(null)

  const selectFile = (event) => {
    if (event.target.files[0]) {
      const fileUrl = URL.createObjectURL(event.target.files[0])
      setFile(fileUrl)
      if (setFormData) {
        setFormData(event.target.files[0])
      }
    }
  }
  const selectFiles = (event) => {
    const fileUrl = URL.createObjectURL(event.target.files[0])
    setFiles(fileUrl, event.target.files[0])
  }
  return (
    <div className={styles.container}>
      {variant === 'product' && files ? (
        <div
          className={styles.productImage}
          style={{
            backgroundImage: `url(${files})`,
          }}
        >
          <img
            onClick={onDelete}
            className={styles.trashIcon}
            src={trashIcon}
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
        onChange={variant === 'product' ? selectFiles : selectFile}
        className={styles.fileInput}
        type='file'
        ref={fileRef}
      />
    </div>
  )
}

export default Filepicker

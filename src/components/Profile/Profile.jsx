import { useState } from 'react'
import Filepicker from '../UI/Avatar/Filepicker'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { Modal } from '../UI/Modal/Modal'
import styles from './Profile.module.css'

const Profile = () => {
  const [file, setFile] = useState(null)
  const [showNumberModal, setShowModal] = useState(false)
  const showNumberModalHandler = () => {
    setShowModal(true)
  }
  const hideNumberModalHandler = () => {
    setShowModal(false)
  }
  return (
    <div className={styles.profile}>
      <Filepicker file={file} setFile={setFile} variant='avatar' />
      <div className={styles.tools}>
        <div className={styles.input}>
          <Input variant='profile' placeholder='Имя' />
        </div>
        <div className={styles.input}>
          <Input variant='profile' placeholder='Фамилия' />
        </div>
        <div className={styles.input}>
          <p>Kurokaw3a</p>
        </div>
        <Input variant='date' />
      </div>
      <div className={styles.userContacts}>
        <div className={styles.number}>
          <p onClick={showNumberModalHandler} className={styles.addNumber}>
            Добавить номер
          </p>
          <Input disabled variant='numberProfile' />
        </div>
        <p className={styles.email}>kamaldinov321@gmail.com</p>
      </div>
      <Button variant='auth'>Закончить регистрацию</Button>
      {showNumberModal && (
        <Modal variant='reset' onClose={hideNumberModalHandler} />
      )}
    </div>
  )
}

export default Profile

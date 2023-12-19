/* eslint-disable no-self-compare */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserProfile,
  putUserProfile,
} from '../../services/Profile/MarketActions'
import { MarketSlice } from '../../services/Profile/MarketSlice'
import Filepicker from '../UI/Avatar/Filepicker'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { Modal } from '../UI/Modal/Modal'
import styles from './Profile.module.css'

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [])
  const { profile } = useSelector((state) => state.Market)
  const [file, setFile] = useState(null)
  const [showNumberModal, setShowModal] = useState(false)
  const showNumberModalHandler = () => {
    setShowModal(true)
  }
  const hideNumberModalHandler = () => {
    setShowModal(false)
  }

  const firstNameHandler = (event) => {
    dispatch(
      MarketSlice.actions.firtName({
        ...profile,
        first_name: event.target.value,
      })
    )
  }
  const lastNameHandler = (event) => {
    dispatch(
      MarketSlice.actions.lastName({
        ...profile,
        last_name: event.target.value,
      })
    )
  }
  const userNameHandler = (event) => {
    dispatch(
      MarketSlice.actions.userName({
        ...profile,
        username: event.target.value,
      })
    )
  }
  const birthDateHandler = (event) => {
    dispatch(
      MarketSlice.actions.birthDate({
        ...profile,
        birth_date: event.target.value,
      })
    )
  }
  const emailHandler = (event) => {
    dispatch(
      MarketSlice.actions.email({
        ...profile,
        email: event.target.value,
      })
    )
  }
  const valid =
    profile?.first_name &&
    profile?.last_name &&
    profile?.username &&
    profile?.birth_date?.length > 9 &&
    profile?.email !== ''
  const updateProfile = () => {
    dispatch(putUserProfile({ body: profile }))
  }
  return (
    <div className={styles.profile}>
      <Filepicker file={file} setFile={setFile} variant='avatar' />
      <div className={styles.tools}>
        <div className={styles.input}>
          <Input
            value={profile?.first_name}
            onChange={firstNameHandler}
            variant='profile'
            placeholder='Имя'
          />
        </div>
        <div className={styles.input}>
          <Input
            value={profile?.last_name}
            onChange={lastNameHandler}
            variant='profile'
            placeholder='Фамилия'
          />
        </div>
        <div className={styles.input}>
          <Input
            value={profile?.username}
            onChange={userNameHandler}
            variant='profile'
            placeholder='Никнейм'
          />
        </div>
        <Input
          value={profile?.birth_date}
          onChange={birthDateHandler}
          variant='date'
        />
      </div>
      <div className={styles.userContacts}>
        <div className={styles.number}>
          <p onClick={showNumberModalHandler} className={styles.addNumber}>
            Добавить номер
          </p>
          <Input disabled variant='numberProfile' />
        </div>
        <Input
          value={profile?.email}
          onChange={emailHandler}
          variant='profile'
          placeholder='Email'
        />
      </div>
      <Button onClick={updateProfile} disabled={!valid} variant='auth'>
        Закончить регистрацию
      </Button>
      {showNumberModal && (
        <Modal variant='reset' onClose={hideNumberModalHandler} />
      )}
    </div>
  )
}

export default Profile

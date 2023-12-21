/* eslint-disable no-self-compare */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserProfile,
  putUserProfile,
} from '../../services/Authorization/AuthActions'
import { AuthSlice } from '../../services/Authorization/AuthSlice'
import Reset from '../Authorization/Reset'
import Filepicker from '../UI/Avatar/Filepicker'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import Loader from '../UI/Lodaer/Loader'
import Snackbar from '../UI/Snackbar/Snackbar'
import styles from './Profile.module.css'

const Profile = () => {
  const dispatch = useDispatch()
  const { profile, profileStatus, phoneVerify } = useSelector(
    (state) => state.Auth
  )
  useEffect(() => {
    dispatch(getUserProfile())
  }, [])
  const [file, setFile] = useState(null)
  const [showNumberModal, setShowModal] = useState(false)
  const showNumberModalHandler = () => {
    setShowModal(true)
  }
  const hideNumberModalHandler = () => {
    setShowModal(false)
    dispatch(AuthSlice.actions.reset())
  }

  const firstNameHandler = (event) => {
    dispatch(
      AuthSlice.actions.firtName({
        ...profile,
        first_name: event.target.value,
      })
    )
  }
  const lastNameHandler = (event) => {
    dispatch(
      AuthSlice.actions.lastName({
        ...profile,
        last_name: event.target.value,
      })
    )
  }
  const userNameHandler = (event) => {
    dispatch(
      AuthSlice.actions.userName({
        ...profile,
        username: event.target.value,
      })
    )
  }
  const birthDateHandler = (event) => {
    dispatch(
      AuthSlice.actions.birthDate({
        ...profile,
        birth_date: event.target.value,
      })
    )
  }
  const emailHandler = (event) => {
    dispatch(
      AuthSlice.actions.email({
        ...profile,
        email: event.target.value,
      })
    )
  }
  const valid =
    profile?.first_name?.length >= 3 &&
    profile?.last_name?.length >= 3 &&
    profile?.username?.length >= 3 &&
    profile?.birth_date?.length > 9 &&
    profile?.email?.length >= 3 !== ''
  const user = JSON.parse(localStorage.getItem('login'))
  const valid2 =
    profile?.first_name === user?.first_name &&
    profile?.last_name === user?.last_name &&
    profile?.username === user?.username &&
    profile?.birth_date === user?.birth_date &&
    profile?.email === user?.email
  const updateProfile = () => {
    dispatch(putUserProfile({ body: profile }))
  }
  const photo = localStorage.getItem('photo')
  return (
    <>
      {profileStatus === 'pending' ? (
        <div className={styles.profile}>
          <Loader />
        </div>
      ) : (
        <div className={styles.profile}>
          <Filepicker file={file || photo} setFile={setFile} variant='avatar' />
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
              <Input disabled variant='numberProfile' value={profile?.phone} />
            </div>
            <Input
              value={profile?.email}
              onChange={emailHandler}
              variant='profile'
              placeholder='Email'
            />
          </div>
          {!valid2 && (
            <Button onClick={updateProfile} disabled={!valid} variant='auth'>
              Закончить регистрацию
            </Button>
          )}
          {showNumberModal && (
            <Reset variant='add' onClose={hideNumberModalHandler} />
          )}
        </div>
      )}
      {phoneVerify === 'success' && (
        <Snackbar variant='success'>Данные успешно изменены</Snackbar>
      )}
    </>
  )
}

export default Profile

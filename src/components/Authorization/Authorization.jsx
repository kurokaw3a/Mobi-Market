import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import marketCover from '../../assets/marketCover.svg'
import marketIcon from '../../assets/marketIcon.svg'
import Button from '../UI/Button/Button'
import Header from '../UI/Header/Header'
import Input from '../UI/Input/Input'
import Snackbar from '../UI/Snackbar/Snackbar'
import styles from './Authorization.module.css'
import Reset from './Reset'

const Authorization = ({ variant }) => {
  const [verification, setVerification] = useState(false)
  const [input, setInput] = useState({
    userName: '',
    userPassword: '',
  })
  const nameHandler = (event) => {
    setInput({ ...input, userName: event.target.value })
    setVerification(false)
  }
  const passwordHandler = (event) => {
    setInput({ ...input, userPassword: event.target.value })
    setVerification(false)
  }

  const validName =
    input.userName.slice(0, 1) ===
      input.userName.slice(0, 1).toLocaleUpperCase() &&
    input.userName.trim().length > 5
  const pasValidopt = /[a-z][0-9]/
  const passValid = pasValidopt.test(input.userPassword.trim())
  const validPassword = input.userPassword.trim().length > 6 && passValid
  const validation = validName && validPassword
  const auth = (event) => {
    event.preventDefault()
    if (
      input.userName === 'Kurokaw3a' &&
      input.userPassword === 'timatikamal7'
    ) {
      setVerification(true)
    }
  }

  const [showResetModal, setShowResetModal] = useState(false)
  const showResetModalHandler = () => {
    setShowResetModal(true)
  }
  const hideResetModalHandler = () => {
    setShowResetModal(false)
  }

  return (
    <div className={variant === 'register' ? styles.regAuth : styles.auth}>
      <div
        className={styles.marketCover}
        style={{ backgroundImage: `url(${marketCover})` }}
      >
        <div className={styles.marketLogo}>
          <img className={styles.marketIcon} src={marketIcon} alt='error' />
          <h2 className={styles.marketTitle}>MOBI MARKET</h2>
        </div>
        <div className={styles.blur} />
      </div>
      <form onSubmit={auth} className={styles.form}>
        {variant === 'register' && (
          <div className={styles.nav}>
            <Header variant='navigation' location='Регистрация' />
          </div>
        )}
        <div className={styles.block}>
          <Input
            onChange={nameHandler}
            variant='auth'
            label='Имя пользователя'
          />
          <div className={styles.passwordInput}>
            <Input
              onChange={passwordHandler}
              variant='auth'
              type='password'
              label='Пароль'
            />
            {variant !== 'register' && (
              <p
                onClick={showResetModalHandler}
                className={styles.recoveryText}
              >
                Забыли пароль
              </p>
            )}
          </div>
          {variant !== 'register' ? (
            <Button variant='auth' disabled={!validation}>
              Войти
            </Button>
          ) : (
            <Button variant='auth' disabled={!validation}>
              Далее
            </Button>
          )}
        </div>
        {variant !== 'register' && (
          <NavLink to='register' className={styles.registerText}>
            <h2 className={styles.registerText}>Зарегистрироваться</h2>
          </NavLink>
        )}
      </form>
      {showResetModal && <Reset onClose={hideResetModalHandler} />}
      {verification && (
        <Snackbar variant='error'>Неверный логин или пароль</Snackbar>
      )}
    </div>
  )
}

export default Authorization

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import lockIcon from '../../assets/authIcons/lockIcon.svg'
import marketCover from '../../assets/marketCover.svg'
import marketIcon from '../../assets/marketIcon.svg'
import {
  postCheckUser,
  postLoginUser,
  postRegisterUser,
} from '../../services/Authorization/AuthActions'
import { AuthSlice } from '../../services/Authorization/AuthSlice'
import Button from '../UI/Button/Button'
import Header from '../UI/Header/Header'
import Input from '../UI/Input/Input'
import Snackbar from '../UI/Snackbar/Snackbar'
import styles from './Authorization.module.css'
import Reset from './Reset'

const Authorization = ({ variant }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.Auth)
  const [input, setInput] = useState({
    userName: '',
    userPassword: '',
    userEmail: '',
  })
  const location = useLocation()
  useEffect(() => {
    setInput({
      userName: '',
      userPassword: '',
      userEmail: '',
    })
  }, [location.pathname])
  const nameHandler = (event) => {
    setInput({ ...input, userName: event.target.value })
    dispatch(AuthSlice.actions.reset())
  }
  const passwordHandler = (event) => {
    setInput({ ...input, userPassword: event.target.value })
  }
  const emailHandler = (event) => {
    setInput({ ...input, userEmail: event.target.value })
    dispatch(AuthSlice.actions.reset())
  }

  const validName =
    input.userName.slice(0, 1) ===
      input.userName.slice(0, 1).toLocaleUpperCase() &&
    input.userName.trim().length >= 3
  const pasValidopt = /[a-z][0-9]/
  const passValid = pasValidopt.test(input.userPassword.trim())
  const validPassword = input.userPassword.trim().length > 6 && passValid
  const validation = validName && validPassword
  const emailValid = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/.test(
    input.userEmail.trim()
  )
  const validationEmail = validName && emailValid
  const logIn = (event) => {
    event.preventDefault()
    dispatch(
      postLoginUser({ username: input.userName, password: input.userPassword })
    )
  }

  const register = (event) => {
    event.preventDefault()
    dispatch(
      postCheckUser({ username: input.userName, email: input.userEmail })
    )
  }

  const [showResetModal, setShowResetModal] = useState(false)
  const showResetModalHandler = () => {
    setShowResetModal(true)
  }
  const hideResetModalHandler = () => {
    setShowResetModal(false)
  }

  const [passwords, setPasswords] = useState({
    first: '',
    second: '',
  })

  const firstPasswordHandler = (event) => {
    setPasswords({ ...passwords, first: event.target.value })
  }
  const secondPasswordHandler = (event) => {
    setPasswords({ ...passwords, second: event.target.value })
  }

  const validPasswords = passwords.first.trim() === passwords.second.trim()
  const validPasswordReg =
    passwords.first.trim().length >= 8 &&
    passwords.second.trim().length >= 8 &&
    pasValidopt.test(passwords.first.trim()) &&
    pasValidopt.test(passwords.second.trim())
  const validReset = validPasswords && validPasswordReg
  const navigate = useNavigate()
  const endRegistration = (event) => {
    event.preventDefault()
    dispatch(AuthSlice.actions.reset())
    setPasswords({
      first: '',
      second: '',
    })
    setInput({
      userName: '',
      userPassword: '',
      userEmail: '',
    })
    dispatch(
      postRegisterUser({
        username: input.userName,
        email: input.userEmail,
        password: passwords.first,
        confirm_password: passwords.second,
      })
    )
    if (state.checkStatus === 'success') {
      navigate('/')
    }
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
      {state.check === 0 ? (
        <form
          onSubmit={variant !== 'register' ? logIn : register}
          className={styles.form}
        >
          {variant === 'register' && (
            <div className={styles.nav}>
              <Header variant='navigation' location='Регистрация' />
            </div>
          )}
          <div className={styles.block}>
            <Input
              onChange={nameHandler}
              value={input.userName}
              variant={state.checkStatus !== 'error' ? 'auth' : 'authError'}
              label='Имя пользователя'
            />
            {variant !== 'register' ? (
              <div className={styles.passwordInput}>
                <Input
                  onChange={passwordHandler}
                  value={input.userPassword}
                  variant='auth'
                  type='password'
                  label='Пароль'
                />
                <p
                  onClick={showResetModalHandler}
                  className={styles.recoveryText}
                >
                  Забыли пароль
                </p>
              </div>
            ) : (
              <Input
                variant={state.checkStatus !== 'error' ? 'auth' : 'authError'}
                onChange={emailHandler}
                value={input.userEmail}
                label='Почта'
                type='text'
              />
            )}
            {variant !== 'register' ? (
              <Button variant='auth' disabled={!validation}>
                Войти
              </Button>
            ) : (
              <Button variant='auth' disabled={!validationEmail}>
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
      ) : (
        <div>
          <div className={styles.nav}>
            <Header variant='navigation' location='Регистрация' />
          </div>
          <div className={styles.password}>
            <form onSubmit={endRegistration} className={styles.formPassword}>
              <img className={styles.userIcon} src={lockIcon} alt='error' />
              <h2 className={styles.newPasswordText}>Придумайте пароль</h2>
              <p className={styles.rules}>
                Минимальная длина — 8 символов. Для надежности пароль должен
                содержать буквы и цифры.
              </p>
              <div className={styles.inputs}>
                <Input
                  variant={validPasswords ? 'auth' : 'authError'}
                  type='password'
                  label='Пароль'
                  value={passwords.first}
                  onChange={firstPasswordHandler}
                />
                <Input
                  variant={validPasswords ? 'auth' : 'authError'}
                  type='password'
                  label='Повторите пароль'
                  value={passwords.second}
                  onChange={secondPasswordHandler}
                />
              </div>
              {validPasswords === false && (
                <p className={styles.errorText}>Пароли не совпадают</p>
              )}
              <div className={styles.nextButton}>
                <Button variant='auth' disabled={!validReset}>
                  Далее
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showResetModal && <Reset onClose={hideResetModalHandler} />}
      {state.loginStatus === 'error' && (
        <Snackbar variant='error'>Неверный логин или пароль</Snackbar>
      )}
      {state.checkStatus === 'error' && (
        <Snackbar variant='error'>
          Данный пользователь уже зарегистрирован
        </Snackbar>
      )}
      {state.changeStatus === 'success' && (
        <Snackbar variant='success'>Пароль сменён успешно!</Snackbar>
      )}
    </div>
  )
}

export default Authorization

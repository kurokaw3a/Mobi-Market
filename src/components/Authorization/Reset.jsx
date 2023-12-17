import { useRef, useState } from 'react'
import lockIcon from '../../assets/authIcons/lockIcon.svg'
import phoneIcon from '../../assets/authIcons/phoneIcon.svg'
import showIcon from '../../assets/authIcons/showIcon.svg'
import userIcon from '../../assets/authIcons/userIcon.svg'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { Modal } from '../UI/Modal/Modal'
import styles from './Reset.module.css'

const Reset = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const phoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value)
  }
  const phoneValid = phoneNumber === '0(773) 082 508'
  const valid = phoneNumber.trim().length >= 14
  const [code, setCode] = useState('')
  const codeHandler = (event) => {
    setCode(event.target.value)
  }
  const [codeStatus, setCodeStatus] = useState(false)
  const [timer, setTimer] = useState(60)
  const interval = useRef(null)
  const sendCode = (e) => {
    e.preventDefault()
    setCodeStatus(true)
    setTimer(60)
    interval.current = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
  }
  if (timer === 0) {
    clearInterval(interval.current)
  }
  const [resetStatus, setResetStatus] = useState(false)
  const [codeValid, setCodeValid] = useState(true)
  const sumbitCode = (e) => {
    e.preventDefault()
    if (code === '1234') {
      setCodeValid(false)
    } else if (code.length === 4) {
      setResetStatus(true)
    }
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
  const pasValidopt = /[a-z][0-9]/
  const validPasswords = passwords.first.trim() === passwords.second.trim()
  const validPassword =
    passwords.first.trim().length >= 8 &&
    passwords.second.trim().length >= 8 &&
    pasValidopt.test(passwords.first.trim()) &&
    pasValidopt.test(passwords.second.trim())
  const validReset = validPasswords && validPassword
  const resetPassword = () => {
    onClose()
  }
  return (
    <Modal variant='reset' onClose={onClose}>
      {codeStatus === false && resetStatus === false && (
        <div className={styles.reset}>
          <h1 className={styles.title}>Введите номер телефона</h1>
          <form onSubmit={sendCode} className={styles.form}>
            <img className={styles.img} src={phoneIcon} alt='error' />
            <h3 className={styles.formTitle}>Введите номер телефона</h3>
            <p className={styles.formText}>
              Мы отправим вам СМС с кодом подтверждения
            </p>
            <div className={styles.phoneInput}>
              <Input
                variant='number'
                onChange={phoneNumberHandler}
                value={phoneNumber}
              />
            </div>
            {phoneValid && (
              <p className={styles.errorText}>
                Данный номер телефона не зарегистрирован
              </p>
            )}
            <div>
              <div className={styles.phoneSubmitButton}>
                <Button variant='reset' disabled={phoneValid ? true : !valid}>
                  Далее
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      {codeStatus === true && resetStatus === false && (
        <div className={styles.reset}>
          <h2 className={styles.resetText}>Сброс пароля</h2>
          <form onSubmit={sumbitCode} className={styles.form}>
            <img className={styles.userIcon} src={userIcon} alt='error' />
            <p className={styles.codeText}>Введите код из СМС</p>
            <div className={styles.codeInput}>
              <Input
                value={code}
                onChange={codeHandler}
                variant='verification'
              />
            </div>
            {timer > 0 ? (
              <div className={styles.repeat}>
                <p className={styles.repeatText}>Повторный запрос</p>
                <div className={styles.pending}>
                  <span className={styles.loader} />
                  <p className={styles.seconds}>00:{timer}</p>
                </div>
              </div>
            ) : (
              <p onClick={sendCode} className={styles.sendCodeAgain}>
                Отправить код еще раз
              </p>
            )}
            {!codeValid && <p className={styles.errorText}>Неверный код</p>}
          </form>
        </div>
      )}
      {codeStatus === true && resetStatus === true && (
        <div className={styles.reset}>
          <div className={styles.titleBlock}>
            <h1 className={styles.newPassword}>Новый пароль</h1>
            <img className={styles.showIcon} src={showIcon} alt='error' />
          </div>
          <form className={styles.form}>
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
              <Button
                onClick={resetPassword}
                variant='auth'
                disabled={!validReset}
              >
                Далее
              </Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  )
}

export default Reset

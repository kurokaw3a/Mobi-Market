import { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import hideIcon from '../../../assets/inputIcons/hideIcon.svg'
import showIcon from '../../../assets/inputIcons/showIcon.svg'
import styles from './Input.module.css'

const Input = ({
  variant,
  label,
  type,
  placeholder,
  maxLength,
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false)
  const showPass = () => {
    setShow((prev) => !prev)
  }
  return (
    <div className={styles.container}>
      {variant !== 'number' && variant !== 'overviewTextArea' && (
        <input
          id='input'
          className={
            (variant === 'auth' && styles.authInput) ||
            (variant === 'authError' && styles.authInputError) ||
            (variant === 'verification' && styles.verificationInput) ||
            (variant === 'overview' && styles.overviewInput)
          }
          required
          type={show ? 'text' : type}
          placeholder={placeholder || (variant === 'verification' && '0000')}
          maxLength={maxLength || (type === 'password' && 20)}
          onChange={onChange}
          value={value}
        />
      )}
      {variant === 'number' && (
        <div>
          <ReactInputMask
            className={styles.numberInput}
            mask='0(999) 999 999'
            placeholder='0(000) 000 000'
            maskChar=' '
          />
        </div>
      )}
      {variant === 'overviewTextArea' && (
        <textarea
          className={styles.overviewTextarea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {type === 'password' && (
        <img
          onClick={showPass}
          className={styles.showPasswordIcon}
          src={show ? hideIcon : showIcon}
          alt='error'
        />
      )}
      {label && (
        <label className={styles.label} htmlFor='input'>
          {label}
        </label>
      )}
    </div>
  )
}

export default Input

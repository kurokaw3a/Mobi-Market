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
  disabled,
}) => {
  const [show, setShow] = useState(false)
  const showPass = () => {
    setShow((prev) => !prev)
  }
  return (
    <div>
      {type === 'password' && (
        <img
          onClick={showPass}
          className={styles.showPasswordIcon}
          src={show ? hideIcon : showIcon}
          alt='error'
        />
      )}
      <div className={styles.inputBlock}>
        {variant !== 'number' &&
          variant !== 'numberProfile' &&
          variant !== 'overviewTextArea' &&
          variant !== 'date' && (
            <input
              style={{ background: 'none' }}
              name='input'
              className={
                (variant === 'auth' && styles.authInput) ||
                (variant === 'authError' && styles.authInputError) ||
                (variant === 'verification' && styles.verificationInput) ||
                (variant === 'overview' && styles.overviewInput) ||
                (variant === 'profile' && styles.profileInput)
              }
              required
              type={show ? 'text' : type}
              placeholder={
                placeholder || (variant === 'verification' && '0000')
              }
              maxLength={
                maxLength ||
                (type === 'password' && 20) ||
                (variant === 'verification' && 4)
              }
              onChange={onChange}
              value={value}
            />
          )}
        {label && (
          <label className={styles.label} htmlFor='input'>
            {label}
          </label>
        )}
      </div>
      {variant === 'number' && (
        <div>
          <ReactInputMask
            style={{ background: 'none' }}
            className={styles.numberInput}
            mask='0(999) 999 999'
            placeholder='0(000) 000 000'
            maskChar=' '
            value={value}
            onChange={onChange}
          />
        </div>
      )}
      {variant === 'numberProfile' && (
        <div>
          <ReactInputMask
            style={{ background: 'none' }}
            className={styles.numberInputProfile}
            mask='0(999) 999 999'
            placeholder='0(000) 000 000'
            maskChar=' '
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
      )}
      {variant === 'date' && (
        <div>
          <ReactInputMask
            style={{ background: 'none' }}
            className={styles.profileInput}
            mask='9999-99-99'
            placeholder='гггг-мм-дд'
            maskChar=''
            value={value}
            onChange={onChange}
          />
        </div>
      )}
      {variant === 'overviewTextArea' && (
        <textarea
          style={{ background: 'none' }}
          className={styles.overviewTextarea}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
}

export default Input

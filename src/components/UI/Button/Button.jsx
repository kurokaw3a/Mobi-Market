import styles from './Button.module.css'

const Button = ({ children, disabled, variant, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor:
          (disabled && variant === 'auth' && 'rgba(192, 192, 192, 1)') ||
          (disabled && 'rgba(247, 247, 248, 1)'),
        cursor: disabled && 'default',
        color: disabled && variant === 'reset' && '#9CA4AB',
      }}
      className={
        (variant === 'auth' && styles.authButton) ||
        (variant === 'reset' && styles.resetButton) ||
        (variant === 'actions' && styles.actionsButton) ||
        (variant === 'delete' && styles.deleteButton) ||
        (variant === 'announcement' && styles.announcementButton)
      }
    >
      {children}
    </button>
  )
}

export default Button

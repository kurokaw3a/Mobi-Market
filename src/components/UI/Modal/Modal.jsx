import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = ({ onClose }) => {
  return <div onClickCapture={onClose} className={styles.backdrop} />
}

const ModalContent = ({ children, variant }) => {
  return (
    <div
      className={
        (variant === 'reset' && styles.resetModal) ||
        (variant === 'product' && styles.productModal) ||
        styles.modalContent
      }
    >
      {children}
    </div>
  )
}

const BackdropRoot = document.getElementById('backdrop')
const ModalRoot = document.getElementById('modal')

export const Modal = ({ children, variant, onClose }) => {
  return (
    <>
      {createPortal(<Backdrop onClose={onClose} />, BackdropRoot)}
      {createPortal(
        <ModalContent variant={variant}>{children}</ModalContent>,
        ModalRoot
      )}
    </>
  )
}

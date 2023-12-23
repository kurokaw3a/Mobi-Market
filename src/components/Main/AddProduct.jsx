/* eslint-disable no-plusplus */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import closeIcon from '../../assets/closeIcon.svg'
import { postProduct } from '../../services/Market/MarketActions'
import Filepicker from '../UI/Avatar/Filepicker'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { Modal } from '../UI/Modal/Modal'
import Snackbar from '../UI/Snackbar/Snackbar'
import styles from './AddProduct.module.css'

const AddProduct = ({ onClose }) => {
  const [files, setFiles] = useState([])
  const setProductImages = (url, file) => {
    setFiles([...files, { file, url }])
  }
  const deleteImage = (img) => {
    setFiles(files.filter((el) => el !== img))
  }
  const [product, setProduct] = useState({
    name: '',
    price: '',
    short_description: '',
    full_description: '',
  })
  const productNameHandler = (event) => {
    setProduct({ ...product, name: event.target.value })
  }
  const productPriceHandler = (event) => {
    setProduct({ ...product, price: event.target.value })
  }
  const productShortHandler = (event) => {
    setProduct({ ...product, short_description: event.target.value })
  }
  const productFullHandler = (event) => {
    setProduct({ ...product, full_description: event.target.value })
  }
  const valid =
    files.length >= 1 &&
    product.name.trim().length > 3 &&
    product.price > 0 &&
    product.short_description.trim().length >= 10 &&
    product.full_description.trim().length > 15
  const dispatch = useDispatch()
  const postProducts = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('price', product.price)
    formData.append('short_description', product.short_description)
    formData.append('full_description', product.full_description)
    for (let i = 0; i < files.length; i++) {
      formData.append('uploaded_images', files[i]?.file)
    }
    dispatch(postProduct({ body: formData }))
  }
  const [clarificate, setClarificate] = useState(false)
  const closeModal = () => {
    if (valid) {
      setClarificate(true)
    } else {
      onClose()
    }
  }
  const cancell = () => {
    setClarificate(false)
  }
  return (
    <>
      <Modal variant='product' onClose={closeModal}>
        <div className={styles.container}>
          <div>
            <div className={styles.close}>
              <img
                onClick={closeModal}
                className={styles.closeIcon}
                src={closeIcon}
                alt='error'
              />
            </div>
            <div className={styles.filePicker}>
              <Filepicker
                setFiles={setProductImages}
                setFilesUrl={setProductImages}
                variant='product'
              />
              {files.map((el) => (
                <Filepicker
                  key={el?.url}
                  files={el?.url}
                  variant='product'
                  noclick
                  onDelete={() => deleteImage(el)}
                />
              ))}
            </div>
          </div>
          <form
            disabled={!valid}
            onSubmit={postProducts}
            className={styles.form}
          >
            <div className={styles.inputs}>
              <div className={styles.input}>
                <Input
                  onChange={productPriceHandler}
                  value={product.price}
                  variant='overview'
                  placeholder='Цена'
                  type='number'
                />
              </div>
              <div className={styles.input}>
                <Input
                  onChange={productNameHandler}
                  value={product.name}
                  variant='overview'
                  placeholder='Название'
                />
              </div>
              <div className={styles.input}>
                <Input
                  onChange={productShortHandler}
                  value={product.short_description}
                  variant='overview'
                  placeholder='Короткое описание'
                />
              </div>
              <div className={styles.input}>
                <Input
                  onChange={productFullHandler}
                  value={product.full_description}
                  variant='overviewTextArea'
                  placeholder='Полное описание'
                />
              </div>
            </div>
            <Button disabled={!valid} variant='actions'>
              Добавить
            </Button>
          </form>
        </div>
      </Modal>
      {clarificate && (
        <Snackbar yes={onClose} no={cancell} variant='clarification'>
          Вы действительно хотите отметить добавление товара?
        </Snackbar>
      )}
    </>
  )
}

export default AddProduct

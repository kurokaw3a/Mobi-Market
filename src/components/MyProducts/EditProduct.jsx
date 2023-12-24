/* eslint-disable no-plusplus */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import closeIcon from '../../assets/closeIcon.svg'
import { putProduct } from '../../services/Market/MarketActions'
import { MarketSlice } from '../../services/Market/MarketSlice'
import Filepicker from '../UI/Avatar/Filepicker'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { Modal } from '../UI/Modal/Modal'
import Snackbar from '../UI/Snackbar/Snackbar'
import styles from './EditProduct.module.css'

const EditProduct = ({ onClose, page }) => {
  const [files, setFiles] = useState([])
  const product = useSelector((state) => state.Market.currentProduct)
  const setProductImages = (url, file) => {
    setFiles([...files, { file, url }])
  }
  const deleteImage = (img) => {
    setFiles(files.filter((el) => el !== img))
  }
  const [deletedImages] = useState([])
  const deleteCurrentImage = (id) => {
    const deleted = product?.images?.filter((el) => el.id !== id)
    dispatch(MarketSlice.actions.imageHandler({ ...product, images: deleted }))
    deletedImages.push(id)
  }
  const dispatch = useDispatch()
  const productNameHandler = (event) => {
    dispatch(
      MarketSlice.actions.nameHandler({ ...product, name: event.target.value })
    )
  }
  const productPriceHandler = (event) => {
    dispatch(
      MarketSlice.actions.priceHandler({
        ...product,
        price: event.target.value,
      })
    )
  }
  const productShortHandler = (event) => {
    dispatch(
      MarketSlice.actions.shortDescriptionHandler({
        ...product,
        short_description: event.target.value,
      })
    )
  }
  const productFullHandler = (event) => {
    dispatch(
      MarketSlice.actions.fullDescriptionHandler({
        ...product,
        full_description: event.target.value,
      })
    )
  }
  const valid =
    files.length >= 1 &&
    product.name?.trim().length > 3 &&
    product.price > 0 &&
    product.short_description?.trim().length >= 10 &&
    product.full_description?.trim().length > 15
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
    if (deletedImages.length >= 1) {
      formData.append('deleted_images', deletedImages)
    }
    dispatch(putProduct({ body: formData, id: product?.id, page }))
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
              {product?.images?.map((el) => (
                <Filepicker
                  key={el?.id}
                  files={el?.image}
                  variant='product'
                  noclick
                  onDelete={() => deleteCurrentImage(el?.id)}
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
                  value={Number(product?.price)?.toFixed()}
                  variant='overview'
                  placeholder='Цена'
                  type='number'
                />
              </div>
              <div className={styles.input}>
                <Input
                  onChange={productNameHandler}
                  value={product?.name}
                  variant='overview'
                  placeholder='Название'
                />
              </div>
              <div className={styles.input}>
                <Input
                  onChange={productShortHandler}
                  value={product?.short_description}
                  variant='overview'
                  placeholder='Короткое описание'
                />
              </div>
              <div className={styles.input}>
                <Input
                  onChange={productFullHandler}
                  value={product?.full_description}
                  variant='overviewTextArea'
                  placeholder='Полное описание'
                />
              </div>
            </div>
            <Button disabled={!valid} variant='actions'>
              Сохранить
            </Button>
          </form>
        </div>
      </Modal>
      {clarificate && (
        <Snackbar yes={onClose} no={cancell} variant='clarification'>
          Вы действительно хотите отметить изменение товара?
        </Snackbar>
      )}
    </>
  )
}

export default EditProduct

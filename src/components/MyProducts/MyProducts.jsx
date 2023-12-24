/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import trashImg from '../../assets/trash.svg'
import {
  deleteProduct,
  getCurrentProduct,
  getMyProducts,
  likeProduct,
  unlikeProduct,
} from '../../services/Market/MarketActions'
import { MarketSlice } from '../../services/Market/MarketSlice'
import Button from '../UI/Button/Button'
import Card from '../UI/Card/Card'
import Footer from '../UI/Footer/Footer'
import Loader from '../UI/Lodaer/Loader'
import { Modal } from '../UI/Modal/Modal'
import NoContent from '../UI/NoContent'
import Snackbar from '../UI/Snackbar/Snackbar'
import CurrentMyProduct from './CurrentMyProduct'
import EditProduct from './EditProduct'
import styles from './MyProducts.module.css'

const MyProducts = () => {
  const [page, setPage] = useState(1)
  const {
    myProducts,
    countMyProducts,
    getMyProductsStatus,
    likedStatus,
    currentProduct,
    getCurrentProductStatus,
    deleteProductStatus,
    putProductStatus,
  } = useSelector((state) => state.Market)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyProducts({ page }))
  }, [page])
  const [currentProductModal, setCurrentProductModal] = useState(false)
  const showCurrentProductModal = (id) => {
    setCurrentProductModal(true)
    dispatch(getCurrentProduct({ id }))
  }
  const [index, setIndex] = useState(0)
  const nextPhoto = (i) => {
    setIndex(i)
  }
  const hideCurrentProductModal = () => {
    setCurrentProductModal(false)
    setIndex(0)
  }
  const like = (id) => {
    dispatch(likeProduct({ id, page }))
  }
  const unlike = (id) => {
    dispatch(unlikeProduct({ id }))
    dispatch(getMyProducts({ page }))
  }
  const [editModal, setEditModal] = useState(false)
  const [productId, setProductId] = useState()
  const showEditModal = (id) => {
    setCurrentProductModal(false)
    setEditModal(true)
    setProductId(id)
    dispatch(MarketSlice.actions.reset())
    dispatch(getCurrentProduct({ id }))
  }
  const hideEditModal = () => {
    setEditModal(false)
    setProductId(null)
    dispatch(MarketSlice.actions.resetCurrentProduct())
  }
  const [deleteModal, setDeleteModal] = useState(false)
  const showDeleteModal = (id) => {
    setCurrentProductModal(false)
    setDeleteModal(true)
    setProductId(id)
  }
  const hideDeleteModal = () => {
    setDeleteModal(false)
    setProductId(null)
  }
  const deleteProductHandler = () => {
    dispatch(deleteProduct({ id: productId }))
    hideDeleteModal()
  }
  useEffect(() => {
    dispatch(getMyProducts({ page }))
  }, [deleteProductStatus])
  useEffect(() => {
    setEditModal(false)
    dispatch(MarketSlice.actions.resetCurrentProduct())
  }, [putProductStatus === 'success'])
  return (
    <div className={styles.container}>
      {getMyProductsStatus === 'pending' && !likedStatus ? (
        <Loader />
      ) : myProducts?.length >= 1 ? (
        <div className={styles.body}>
          <div className={styles.productsBlock}>
            <div className={styles.products}>
              {myProducts?.map((el) => (
                <div key={el.id}>
                  <Card
                    variant='my'
                    img={el.images[0]?.image}
                    title={el.name}
                    price={Number(el.price)}
                    likes={el.like_count}
                    liked={el.liked_by_current_user}
                    unlike={() => unlike(el.id)}
                    like={() => like(el.id)}
                    currentProduct={() => showCurrentProductModal(el.id)}
                    onEdit={() => showEditModal(el.id)}
                    onDelete={() => showDeleteModal(el.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Footer pages={countMyProducts} page={page} setPage={setPage} />
        </div>
      ) : (
        <NoContent />
      )}
      {currentProductModal && (
        <CurrentMyProduct
          key={currentProduct?.id}
          onClose={hideCurrentProductModal}
          status={getCurrentProductStatus}
          id={currentProduct?.id}
          images={currentProduct?.images}
          name={currentProduct?.name}
          price={Number(currentProduct?.price)}
          number={currentProduct?.phone_number}
          likes={currentProduct?.like_count}
          liked={currentProduct?.liked_by_current_user}
          shortDescription={currentProduct?.short_description}
          fullDescription={currentProduct?.full_description}
          index={index}
          nexPhoto={nextPhoto}
          onEdit={() => showEditModal(currentProduct.id)}
          onDelete={() => showDeleteModal(currentProduct.id)}
        />
      )}
      {editModal && <EditProduct onClose={hideEditModal} page={page} />}
      {deleteModal && (
        <Modal onClose={hideDeleteModal}>
          <div className={styles.unlikeBlock}>
            <img className={styles.likeImg} src={trashImg} alt='error' />
            <p className={styles.unlikeText}>
              Вы действительно хотите удалить данный товар?
            </p>
            <Button variant='actions' onClick={deleteProductHandler}>
              Удалить
            </Button>
            <h2 onClick={hideDeleteModal} className={styles.cancell}>
              Отмена
            </h2>
          </div>
        </Modal>
      )}
      {putProductStatus === 'success' && (
        <Snackbar variant='success'>Товар изменён</Snackbar>
      )}
      {putProductStatus === 'error' && (
        <Snackbar variant='error'>Ошибка при редактировании товара</Snackbar>
      )}
    </div>
  )
}

export default MyProducts

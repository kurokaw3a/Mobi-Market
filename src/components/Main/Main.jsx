/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import likeImg from '../../assets/like.svg'
import { getUserProfile } from '../../services/Authorization/AuthActions'
import {
  getCurrentProduct,
  getProducts,
  likeProduct,
  unlikeProduct,
} from '../../services/Market/MarketActions'
import Button from '../UI/Button/Button'
import Card from '../UI/Card/Card'
import Footer from '../UI/Footer/Footer'
import Header from '../UI/Header/Header'
import Loader from '../UI/Lodaer/Loader'
import { Modal } from '../UI/Modal/Modal'
import NoContent from '../UI/NoContent'
import Snackbar from '../UI/Snackbar/Snackbar'
import AddProduct from './AddProduct'
import CurrentProduct from './CurrentProduct'
import styles from './Main.module.css'

const Main = () => {
  const [page, setPage] = useState(1)
  const { login, profile } = useSelector((state) => state.Auth)
  const {
    products,
    getProductsStatus,
    likedStatus,
    currentProduct,
    getCurrentProductStatus,
    countProducts,
    postProductStatus,
  } = useSelector((state) => state.Market)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserProfile())
  }, [])
  useEffect(() => {
    dispatch(getProducts({ page }))
  }, [page])
  const like = (id) => {
    dispatch(likeProduct({ id, page }))
  }
  const [UnlikeModal, setUnlikeModal] = useState(false)
  const [productId, setProductId] = useState()
  const showUnlikeModalHandler = (id) => {
    setUnlikeModal(true)
    setProductId(id)
  }
  const hideUnlikeModalHandler = () => {
    setUnlikeModal(false)
  }
  const unlike = () => {
    dispatch(unlikeProduct({ id: productId }))
    dispatch(getProducts({ page }))
    hideUnlikeModalHandler()
  }
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
  const [announcementModal, setAnnouncementModal] = useState(false)
  const showAnnouncementModal = () => {
    setAnnouncementModal(true)
  }
  const hideAnnouncementModal = () => {
    setAnnouncementModal(false)
  }
  return (
    <div className={styles.container}>
      <Header
        avatar={profile?.photo}
        username={login?.username}
        email={login?.email}
        placeAnnouncement={showAnnouncementModal}
      />
      <div className={styles.body}>
        {getProductsStatus === 'pending' && !likedStatus ? (
          <div className={styles.main}>
            <Loader />
          </div>
        ) : products?.length >= 1 ? (
          <div className={styles.main}>
            {products?.map((el) => (
              <Card
                key={el.id}
                img={el.images[0]?.image}
                title={el.name}
                price={Number(el.price)}
                likes={el.like_count}
                liked={el.liked_by_current_user}
                like={() => like(el.id)}
                unlike={() => showUnlikeModalHandler(el.id)}
                currentProduct={() => showCurrentProductModal(el.id)}
              />
            ))}
          </div>
        ) : (
          <NoContent />
        )}
      </div>
      <Footer pages={countProducts} page={page} setPage={setPage} />
      {UnlikeModal && (
        <Modal onClose={hideUnlikeModalHandler}>
          <div className={styles.unlikeBlock}>
            <img className={styles.likeImg} src={likeImg} alt='error' />
            <p className={styles.unlikeText}>
              Вы действительно хотите удалить из понравившихся
            </p>
            <Button variant='actions' onClick={unlike}>
              Удалить
            </Button>
            <h2 onClick={hideUnlikeModalHandler} className={styles.cancell}>
              Отмена
            </h2>
          </div>
        </Modal>
      )}
      {currentProductModal && (
        <CurrentProduct
          key={currentProduct?.id}
          onClose={hideCurrentProductModal}
          status={getCurrentProductStatus}
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
        />
      )}
      {announcementModal && (
        <AddProduct page={page} onClose={hideAnnouncementModal} />
      )}
      {postProductStatus === 'success' && (
        <Snackbar variant='success'>Товар добавлен</Snackbar>
      )}
      {postProductStatus === 'error' && (
        <Snackbar variant='error'>Ошибка при добавлении товара</Snackbar>
      )}
    </div>
  )
}

export default Main

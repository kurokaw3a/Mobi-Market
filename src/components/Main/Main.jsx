import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import likeImg from '../../assets/like.svg'
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
import CurrentProduct from './CurrentProduct'
import styles from './Main.module.css'

const Main = () => {
  const [page, setPage] = useState(1)
  const { login } = useSelector((state) => state.Auth)
  const {
    products,
    getProductsStatus,
    likedStatus,
    currentProduct,
    getCurrentProductStatus,
  } = useSelector((state) => state.Market)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts({ page }))
  }, [])
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
  return (
    <div className={styles.container}>
      <Header username={login?.username} email={login?.email} />
      {getProductsStatus === 'pending' && !likedStatus ? (
        <div className={styles.main}>
          <Loader />
        </div>
      ) : (
        <div className={styles.main}>
          {products?.map((el) => (
            <Card
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
      )}
      <Footer pages={[1]} page={page} setPage={setPage} />
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
        />
      )}
    </div>
  )
}

export default Main

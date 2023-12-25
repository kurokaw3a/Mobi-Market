/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import trashImg from '../../assets/trash.svg'
import {
  getCurrentProduct,
  getLikedProducts,
  unlikeProduct,
} from '../../services/Market/MarketActions'
import { MarketSlice } from '../../services/Market/MarketSlice'
import CurrentProduct from '../Main/CurrentProduct'
import Button from '../UI/Button/Button'
import Card from '../UI/Card/Card'
import Footer from '../UI/Footer/Footer'
import Loader from '../UI/Lodaer/Loader'
import { Modal } from '../UI/Modal/Modal'
import NoContent from '../UI/NoContent'
import styles from './LikedProducts.module.css'

const LikedProducts = () => {
  const [page, setPage] = useState(1)
  const {
    likedProducts,
    countLikedProducts,
    getLikedProductsStatus,
    currentProduct,
    getCurrentProductStatus,
  } = useSelector((state) => state.Market)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLikedProducts({ page }))
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
  const [UnlikeModal, setUnlikeModal] = useState(false)
  const [productId, setProductId] = useState()
  const showUnlikeModalHandler = (id) => {
    setUnlikeModal(true)
    setProductId(id)
  }
  const hideUnlikeModalHandler = () => {
    setUnlikeModal(false)
    dispatch(getLikedProducts({ page }))
  }
  const unlike = () => {
    dispatch(unlikeProduct({ id: productId }))
    dispatch(getLikedProducts({ page }))
    hideUnlikeModalHandler()
  }
  const resetStatus = () => {
    dispatch(MarketSlice.actions.reset())
  }
  return (
    <div className={styles.container}>
      {getLikedProductsStatus === 'pending' ? (
        <Loader />
      ) : likedProducts?.length >= 1 ? (
        <div className={styles.body}>
          <div className={styles.productsBlock}>
            <div className={styles.products}>
              {likedProducts?.map((el) => (
                <div key={el.id}>
                  <Card
                    img={el.images[0]?.image}
                    title={el.name}
                    price={Number(el.price)}
                    likes={el.like_count}
                    liked={el.liked_by_current_user}
                    unlike={() => showUnlikeModalHandler(el.id)}
                    currentProduct={() => showCurrentProductModal(el.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Footer
            pages={countLikedProducts}
            page={page}
            setPage={setPage}
            reset={resetStatus}
          />
        </div>
      ) : (
        <NoContent />
      )}
      {currentProductModal && (
        <CurrentProduct
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
        />
      )}
      {UnlikeModal && (
        <Modal onClose={hideUnlikeModalHandler}>
          <div className={styles.unlikeBlock}>
            <img className={styles.likeImg} src={trashImg} alt='error' />
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
    </div>
  )
}

export default LikedProducts

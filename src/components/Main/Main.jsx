import { useState } from 'react'
import Card from '../UI/Card/Card'
import Footer from '../UI/Footer/Footer'
import Header from '../UI/Header/Header'
import styles from './Main.module.css'

const Main = () => {
  const [page, setPage] = useState(1)
  const products = [
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
    {
      img: 'https://i.pinimg.com/originals/98/dd/9c/98dd9cc3067b31b9428dd3fc3e31e322.jpg',
      title: 'BMW E60-G POWER',
      price: '400000',
      likes: '5000',
    },
  ]
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        {products.map((el) => (
          <Card
            img={el.img}
            title={el.title}
            price={el.price}
            likes={el.likes}
          />
        ))}
      </div>
      <Footer pages={[1, 2]} page={page} setPage={setPage} />
    </div>
  )
}

export default Main

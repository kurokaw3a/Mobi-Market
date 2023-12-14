import Card from './components/UI/Card/Card'

const App = () => {
  return (
    <div>
      <Card
        img='https://www.allcarz.ru/wp-content/uploads/2010/08/g-power-bmw-m5-hurricane-rr_02-650x433.jpg'
        title='BMW M5 E60 G-POWER'
        price={10000}
        likes={100}
      />
    </div>
  )
}
export default App

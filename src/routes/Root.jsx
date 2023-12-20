import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Authorization from '../components/Authorization/Authorization'
import Main from '../components/Main/Main'
import Profile from '../components/Profile/Profile'
import Layout from '../layouts/Layout'

const Root = () => {
  const { login } = useSelector((state) => state.Auth)
  return (
    <Routes>
      <Route path='/' element={!login ? <Authorization /> : <Main />} />
      <Route path='/register' element={<Authorization variant='register' />} />
      {login?.access && (
        <Route path='' element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      )}
    </Routes>
  )
}

export default Root

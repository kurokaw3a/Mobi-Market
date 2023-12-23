/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Root from './routes/Root'
import { postRefreshToken } from './services/Authorization/AuthActions'

const App = () => {
  const { login } = useSelector((state) => state.Auth)
  const dispatch = useDispatch()
  if (login?.access) {
    setInterval(() => {
      dispatch(postRefreshToken({ refresh: login?.refresh }))
    }, 100000)
  }
  useEffect(() => {
    dispatch(postRefreshToken({ refresh: login?.refresh }))
  }, [])
  return <Root />
}

export default App


import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiFetch } from '../../api/ApiFetch'

export const postRegisterUser = createAsyncThunk()
export const postLoginUser = createAsyncThunk(
  'post/login',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: 'users/login/',
        method: 'POST',
        body: {
          username: props.username,
          password: props.password,
        },
      })
      localStorage.setItem('login', JSON.stringify(response))
      return { login: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiFetch, ApiFile } from '../../api/ApiFetch'

export const postRegisterUser = createAsyncThunk(
  'post/register',
  async (props, { rejectWithValue }) => {
    try {
      await ApiFetch({
        url: 'users/register/',
        method: 'POST',
        body: {
          email: props.email,
          username: props.username,
          password: props.password,
          confirm_password: props.confirm_password,
        },
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
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

export const postCheckUser = createAsyncThunk(
  'post/checkUser',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: 'users/check-user/',
        method: 'POST',
        body: { username: props.username, email: props.email },
      })
      return { check: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const postRefreshToken = createAsyncThunk(
  'post/refreshToken',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: 'users/login/refresh/',
        method: 'POST',
        body: { refresh: props.refresh },
      })
      return { token: response?.access }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getUserProfile = createAsyncThunk(
  'get/profile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({ url: 'users/me/' })
      return { profile: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const putUserProfile = createAsyncThunk(
  'put/profile',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      await ApiFile({
        url: 'users/profile/update/',
        method: 'PUT',
        body: props.body,
      })
      dispatch(getUserProfile())
      return { profile: props.body }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const putProfielAddPhone = createAsyncThunk(
  'put/profileAddPhone',
  async (props, { rejectWithValue }) => {
    try {
      await ApiFetch({
        url: 'users/add-phone/',
        method: 'PUT',
        body: { phone: props.body },
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const postVerifyPhone = createAsyncThunk(
  'post/verifyPhone',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      await ApiFetch({
        url: 'users/verify-phone/',
        method: 'POST',
        body: { code: props.body },
      })
      dispatch(getUserProfile())
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const postUserForgotPassword = createAsyncThunk(
  'post/userForgotPassword',
  async (props, { rejectWithValue }) => {
    try {
      const resposne = await ApiFetch({
        url: 'users/forgot-password/',
        method: 'POST',
        body: { phone: props.body },
      })
      return { userId: resposne?.user_id }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const postUserResetPassword = createAsyncThunk(
  'post/userResetPassword',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `users/reset-password/${props.userId}/`,
        method: 'POST',
        body: { code: props.body },
      })
      localStorage.setItem('login', response?.access)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const postUserChangePassword = createAsyncThunk(
  'post/userChangePassword',
  async (props, { rejectWithValue }) => {
    try {
      await fetch('https://neobook.online/mobi-market/users/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('login')}`,
        },
        body: JSON.stringify(props.body),
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

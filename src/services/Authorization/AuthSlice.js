/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit'
import { postLoginUser } from './AuthActions'

const initialState = {
  loginStatus: null,
  login: null || JSON.parse(localStorage.getItem('login')),
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postLoginUser.pending, (state) => {
        state.loginStatus = 'pending'
      })
      .addCase(postLoginUser.fulfilled, (state, action) => {
        state.loginStatus = 'success'
        state.login = action.payload.login
      })
      .addCase(postLoginUser.rejected, (state) => {
        state.loginStatus = 'error'
      })
  },
})

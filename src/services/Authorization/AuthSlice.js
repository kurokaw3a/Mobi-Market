/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit'
import {
  getUserProfile,
  postCheckUser,
  postLoginUser,
  postRefreshToken,
  postRegisterUser,
  postUserChangePassword,
  postUserForgotPassword,
  postUserResetPassword,
  postVerifyPhone,
  putProfielAddPhone,
  putUserProfile,
} from './AuthActions'

const initialState = {
  loginStatus: null,
  login: null || JSON.parse(localStorage.getItem('login')),
  refreshStatus: null,
  profile: null,
  profileStatus: null,
  codeStatus: false,
  phoneVerify: false,
  check: 0,
  checkStatus: null,
  resetPasswordStatus: null,
  userId: null,
  resetStatus: false,
  changeStatus: false,
  reset: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    firtName(state, action) {
      state.profile = action.payload
    },
    lastName(state, action) {
      state.profile = action.payload
    },
    userName(state, action) {
      state.profile = action.payload
    },
    birthDate(state, action) {
      state.profile = action.payload
    },
    email(state, action) {
      state.profile = action.payload
    },
    reset(state) {
      state.codeStatus = false
      state.phoneVerify = false
      state.check = 0
      state.userId = null
      state.reset = null
      state.resetStatus = false
      state.changeStatus = false
      state.checkStatus = null
      state.resetPasswordStatus = null
    },
    checked(state) {
      state.check = 1
    },
  },
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
      .addCase(postRegisterUser.pending, (state) => {
        state.regStatus = 'pending'
      })
      .addCase(postRegisterUser.fulfilled, (state) => {
        state.regStatus = 'success'
      })
      .addCase(postRegisterUser.rejected, (state) => {
        state.regStatus = 'error'
      })
      .addCase(postCheckUser.pending, (state) => {
        state.check = 0
        state.checkStatus = 'pedning'
      })
      .addCase(postCheckUser.fulfilled, (state, action) => {
        if (
          action.payload.check?.username === false &&
          action.payload.check?.email === false
        ) {
          state.check = 1
          state.checkStatus = 'success'
        } else {
          state.check = 0
          state.checkStatus = 'error'
        }
      })
      .addCase(postCheckUser.rejected, (state) => {
        state.check = 0
        state.checkStatus = 'error'
      })
      .addCase(getUserProfile.pending, (state) => {
        state.profileStatus = 'pending'
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileStatus = 'success'
        state.profile = action.payload.profile
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.profileStatus = 'error'
      })
      .addCase(postRefreshToken.pending, (state) => {
        state.refreshStatus = 'pending'
      })
      .addCase(postRefreshToken.fulfilled, (state, action) => {
        state.refreshStatus = 'success'
        state.login = { ...state.login, access: action.payload.token }
        localStorage.setItem('login', JSON.stringify(state.login))
      })
      .addCase(postRefreshToken.rejected, (state) => {
        state.refreshStatus = 'error'
      })
      .addCase(putUserProfile.pending, (state) => {
        state.profileStatus = 'pending'
      })
      .addCase(putUserProfile.fulfilled, (state, action) => {
        state.profileStatus = 'success'
        state.login = {
          ...state.login,
          first_name: action.payload.profile?.first_name,
          last_name: action.payload.profile?.last_name,
          username: action.payload.profile?.username,
          birth_date: action.payload.profile?.birth_date,
          email: action.payload.profile?.email,
          phone: action.payload.profile?.phone,
        }
        localStorage.setItem('login', JSON.stringify(state.login))
      })
      .addCase(putUserProfile.rejected, (state) => {
        state.profileStatus = 'error'
      })
      .addCase(putProfielAddPhone.pending, (state) => {
        state.codeStatus = 'pending'
      })
      .addCase(putProfielAddPhone.fulfilled, (state) => {
        state.codeStatus = true
      })
      .addCase(putProfielAddPhone.rejected, (state) => {
        state.codeStatus = 'error'
      })
      .addCase(postVerifyPhone.pending, (state) => {
        state.phoneVerify = 'pending'
      })
      .addCase(postVerifyPhone.fulfilled, (state) => {
        state.phoneVerify = 'success'
      })
      .addCase(postVerifyPhone.rejected, (state) => {
        state.phoneVerify = 'error'
      })
      .addCase(postUserForgotPassword.fulfilled, (state, action) => {
        state.codeStatus = true
        state.userId = action.payload.userId
      })
      .addCase(postUserForgotPassword.rejected, (state) => {
        state.codeStatus = 'error'
      })
      .addCase(postUserResetPassword.pending, (state) => {
        state.resetPasswordStatus = 'pending'
      })
      .addCase(postUserResetPassword.fulfilled, (state) => {
        state.resetPasswordStatus = 'success'
        state.resetStatus = true
      })
      .addCase(postUserResetPassword.rejected, (state) => {
        state.resetPasswordStatus = 'error'
      })
      .addCase(postUserChangePassword.pending, (state) => {
        state.changeStatus = 'pending'
      })
      .addCase(postUserChangePassword.fulfilled, (state) => {
        state.changeStatus = 'success'
      })
      .addCase(postUserChangePassword.rejected, (state) => {
        state.changeStatus = 'error'
      })
  },
})

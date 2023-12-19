import { createSlice } from '@reduxjs/toolkit'
import { getUserProfile } from './MarketActions'

const initialState = {
  profileStatus: null,
  profile: null,
}
export const MarketSlice = createSlice({
  name: 'Market',
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
  },
  extraReducers: (builder) => {
    builder
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
  },
})

/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './Authorization/AuthSlice'
import { MarketSlice } from './Market/MarketSlice'

export const store = configureStore({
  reducer: {
    Auth: AuthSlice.reducer,
    Market: MarketSlice.reducer,
  },
})

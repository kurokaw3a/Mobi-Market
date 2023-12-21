import { createSlice } from '@reduxjs/toolkit'
import {
  getCurrentProduct,
  getProducts,
  likeProduct,
  unlikeProduct,
} from './MarketActions'

const initialState = {
  getProductsStatus: null,
  products: [],
  likedStatus: null,
  getCurrentProductStatus: null,
  currentProduct: {},
}
export const MarketSlice = createSlice({
  name: 'Market',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.getProductsStatus = 'pending'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsStatus = 'success'
        state.products = action.payload.products
      })
      .addCase(getProducts.rejected, (state) => {
        state.getProductsStatus = 'error'
      })
      .addCase(getCurrentProduct.pending, (state) => {
        state.getCurrentProductStatus = 'pending'
      })
      .addCase(getCurrentProduct.fulfilled, (state, action) => {
        state.getCurrentProductStatus = 'success'
        state.currentProduct = action.payload.currentProduct
      })
      .addCase(getCurrentProduct.rejected, (state) => {
        state.getCurrentProductStatus = 'error'
      })
      .addCase(likeProduct.pending, (state) => {
        state.likedStatus = 'pending'
      })
      .addCase(likeProduct.fulfilled, (state) => {
        state.likedStatus = 'success'
      })
      .addCase(likeProduct.rejected, (state) => {
        state.likedStatus = 'error'
      })
      .addCase(unlikeProduct.pending, (state) => {
        state.likedStatus = 'pending'
      })
      .addCase(unlikeProduct.fulfilled, (state) => {
        state.likedStatus = 'success'
      })
      .addCase(unlikeProduct.rejected, (state) => {
        state.likedStatus = 'error'
      })
  },
})

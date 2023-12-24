/* eslint-disable no-plusplus */
/* eslint-disable no-unsafe-optional-chaining */
import { createSlice } from '@reduxjs/toolkit'
import {
  deleteProduct,
  getCurrentProduct,
  getLikedProducts,
  getMyProducts,
  getProducts,
  likeProduct,
  postProduct,
  putProduct,
  unlikeProduct,
} from './MarketActions'

const initialState = {
  getProductsStatus: null,
  products: [],
  countProducts: [],
  likedStatus: null,
  getCurrentProductStatus: null,
  currentProduct: {},
  postProductStatus: null,
  likedProducts: [],
  getLikedProductsStatus: null,
  countLikedProducts: [],
  getMyProductsStatus: null,
  myProducts: [],
  countMyProducts: [],
  putProductStatus: null,
  deleteProductStatus: null,
}
export const MarketSlice = createSlice({
  name: 'Market',
  initialState,
  reducers: {
    reset(state) {
      state.getProductsStatus = null
      state.getCurrentProductStatus = null
      state.postProductStatus = null
      state.likedStatus = null
      state.getMyProductsStatus = null
      state.putProductStatus = null
      state.deleteProductStatus = null
    },
    priceHandler(state, action) {
      state.currentProduct = action.payload
    },
    nameHandler(state, action) {
      state.currentProduct = action.payload
    },
    shortDescriptionHandler(state, action) {
      state.currentProduct = action.payload
    },
    fullDescriptionHandler(state, action) {
      state.currentProduct = action.payload
    },
    imageHandler(state, action) {
      state.currentProduct = action.payload
    },
    resetCurrentProduct(state) {
      state.currentProduct = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.getProductsStatus = 'pending'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsStatus = 'success'
        state.products = action.payload.products
        state.countProducts = action.payload.count
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
      .addCase(postProduct.pending, (state) => {
        state.postProductStatus = 'pending'
      })
      .addCase(postProduct.fulfilled, (state) => {
        state.postProductStatus = 'success'
      })
      .addCase(postProduct.rejected, (state) => {
        state.postProductStatus = 'error'
      })
      .addCase(getLikedProducts.pending, (state) => {
        state.getLikedProductsStatus = 'pending'
      })
      .addCase(getLikedProducts.fulfilled, (state, action) => {
        state.getLikedProductsStatus = 'success'
        state.likedProducts = action.payload.likedProducts
        state.countLikedProducts = action.payload.count
      })
      .addCase(getLikedProducts.rejected, (state) => {
        state.getLikedProductsStatus = 'error'
      })
      .addCase(getMyProducts.pending, (state) => {
        state.getMyProductsStatus = 'pending'
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.getMyProductsStatus = 'success'
        state.myProducts = action.payload.myProducts
        state.countMyProducts = action.payload.count
      })
      .addCase(getMyProducts.rejected, (state) => {
        state.getMyProductsStatus = 'error'
      })
      .addCase(putProduct.pending, (state) => {
        state.putProductStatus = 'pending'
      })
      .addCase(putProduct.fulfilled, (state) => {
        state.putProductStatus = 'success'
      })
      .addCase(putProduct.rejected, (state) => {
        state.putProductStatus = 'error'
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductStatus = 'pending'
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProductStatus = 'success'
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteProductStatus = 'error'
      })
  },
})

/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiFetch, ApiFile } from '../../api/ApiFetch'

export const getProducts = createAsyncThunk(
  'get/products',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `products/?page=${props.page}&limit=24`,
      })
      const count = []
      for (let i = 0; i < response?.count; i++) {
        if (i % 24 === 0) {
          count.push(i)
        }
      }
      return { products: response?.results, count }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getCurrentProduct = createAsyncThunk(
  'get/currentProduct',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `products/${props.id}/`,
      })
      return { currentProduct: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const likeProduct = createAsyncThunk(
  'post/likeProduct',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      await ApiFetch({ url: `products/like/${props.id}/`, method: 'POST' })
      dispatch(getProducts({ page: props.page }))
      dispatch(getMyProducts({ page: props.page }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const unlikeProduct = createAsyncThunk(
  'post/unlikeProduct',
  async (props, { rejectWithValue }) => {
    try {
      await ApiFetch({ url: `products/unlike/${props.id}/`, method: 'DELETE' })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const postProduct = createAsyncThunk(
  'post/products',
  async (props, { rejectWithValue }) => {
    try {
      await ApiFile({
        url: 'products/',
        method: 'POST',
        body: props.body,
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getLikedProducts = createAsyncThunk(
  'get/likedProducts',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `products/liked/?page=${props.page}&limit=12`,
      })
      const count = []
      for (let i = 0; i < response?.count; i++) {
        if (i % 12 === 0) {
          count.push(i)
        }
      }
      return { likedProducts: response?.results, count }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getMyProducts = createAsyncThunk(
  'get/MyProducts',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `products/my-products/?page=${props.page}&limit=12`,
      })
      const count = []
      for (let i = 0; i < response?.count; i++) {
        if (i % 12 === 0) {
          count.push(i)
        }
      }
      return { myProducts: response?.results, count }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

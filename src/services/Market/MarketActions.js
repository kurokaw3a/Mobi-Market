/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiFetch } from '../../api/ApiFetch'

export const getProducts = createAsyncThunk(
  'get/products',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `products/?page=${props.page}&limit=24`,
      })
      return { products: response?.results }
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

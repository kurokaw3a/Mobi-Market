/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiFetch } from '../../api/ApiFetch'

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
  'pur/profile',
  async (props, { rejectWithValue }) => {
    try {
      await ApiFetch({
        url: 'users/profile/update/',
        method: 'PUT',
        body: props.body,
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

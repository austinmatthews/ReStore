import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { User } from '../../app/models/user'
import agent from '../../app/api/agent'
import { FieldValues } from 'react-hook-form'

interface AccountState {
  user: User | null
}

const initialState: AccountState = {
  user: null,
}

export const loginUser = createAsyncThunk<User, FieldValues>('account/loginUser', async (data, thunkAPI) => {
  try {
    const user = await agent.Account.login(data)
    localStorage.setItem('user', JSON.stringify(user))
    return user
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const fetchCurrentUser = createAsyncThunk<User>('account/fetchCurrentUser', async (_, thunkAPI) => {
  try {
    const user = await agent.Account.currentUser()
    localStorage.setItem('user', JSON.stringify(user))
    return user
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data })
  }
})

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload
    })
    builder.addMatcher(isAnyOf(loginUser.rejected, fetchCurrentUser.rejected), (_state, action) => {
      console.log(action.payload)
    })
  },
})

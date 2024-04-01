import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  darkMode: boolean
}
const initialState: ThemeState = {
  darkMode: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.darkMode = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = propertiesSlice.actions

export default propertiesSlice.reducer
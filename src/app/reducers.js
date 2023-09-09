import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedin: false,
  user: {},
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    dispatchLoggedIn: (state, action) => {
        state.loggedin = action.payload
    },
    dispatchUser: (state, action) => {
        state.user = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { dispatchLoggedIn, dispatchUser } = counterSlice.actions

export default counterSlice.reducer
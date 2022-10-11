/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WLUserType } from '../../types/user'

export interface CounterState {
  user: WLUserType | undefined
}

const initialState: CounterState = {
  user: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<WLUserType>) => {
      state.user = actions.payload
    },
    removeUser: (state) => {
      state.user = undefined
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer

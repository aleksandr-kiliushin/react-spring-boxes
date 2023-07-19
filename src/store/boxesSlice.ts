import { faker } from '@faker-js/faker'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Status = 'ADDING' | 'DELETING' | 'READY'

type Box = {
  color: string
  id: number
}

export interface BoxesState {
  boxes: Box[]
  status: Status
}

const initialState: BoxesState = {
  boxes: [],
  status: 'READY',
}

export const boxesSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    addBox: (state) => {
      state.boxes.unshift({
        color: faker.color.rgb(),
        id: Math.random(),
      })
    },
    deleteBox: (state) => {
      state.boxes.pop()
    },
    setStatus: (state, action: PayloadAction<{ status: Status }>) => {
      state.status = action.payload.status
    },
  },
})

export const { addBox, deleteBox, setStatus } = boxesSlice.actions

export default boxesSlice.reducer

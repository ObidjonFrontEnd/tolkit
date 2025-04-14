import { createSlice } from '@reduxjs/toolkit'

const initialState = { name: '' }

export const nameReducer = createSlice({
	name: 'userName',
	initialState,
	reducers: {
		SetName: (state, action) => {
			state.name = action.payload
		},
	},
})

export const { SetName } = nameReducer.actions
export default nameReducer.reducer

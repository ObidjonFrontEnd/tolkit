import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  email: '',
  isAuthenticated: false,
	accessToken:''
}

export const userSlice = createSlice({
	name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { accessToken, username, email } = action.payload;
      state.accessToken = accessToken;
      state.username = username;
      state.email = email;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.accessToken = '';
      state.username = '';
      state.email = '';
      state.isAuthenticated = false;
    },
  },
})

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    authUser: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.authToken = action.payload;
    },
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;

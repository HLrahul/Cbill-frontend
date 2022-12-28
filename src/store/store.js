import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { userName: null, userAccessToken: null };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.username;
      state.userAccessToken = action.payload.accessToken;
    },

    logout: (state) => {
      state.userName = initialState.userName;
      state.userAccessToken = initialState.userAccessToken;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

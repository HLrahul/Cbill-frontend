import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { value: { userName: null, userAccessToken: null } };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.userName = action.payload.username;
      state.value.userAccessToken = action.payload.accessToken;
    },

    logout: (state) => {
      state.value.userName = null;
      state.value.userAccessToken = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

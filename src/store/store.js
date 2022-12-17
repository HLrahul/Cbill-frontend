import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { value: { userName: "", userAccessToken: "" } };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.userName = action.payload.username;
      state.value.userAccessToken = action.payload.accessToken;
    },

    logout: (state) => {
      state.value.userName = "";
      state.value.userAccessToken = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

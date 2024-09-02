import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
      state.isLogin = true
    },
    clearUserInfo:(state) => {
      state.userInfo = {};
      state.isLogin = false
    },
  },
});

export const { initUserInfo,clearUserInfo } = userSlice.actions;

export default userSlice.reducer;

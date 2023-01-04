import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  loginInfo: {};
  title: string
}
const initialState: LoginState = {
  loginInfo: {},
  title: "redux toolkit pre"
};

// 创建一个 Slice
export const login = createSlice({
  name: "login",

  initialState,

  // 定义 reducers 并生成关联的操作
  reducers: {
    setLoginInfo(state, { payload }){
      console.log("setLoginInfo",payload);
      state.loginInfo = payload.loginInfo;
    }
  },
});

// 导出 reducers 方法
export const { setLoginInfo } = login.actions;

// 默认导出
export default login.reducer;
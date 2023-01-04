import { configureStore,combineReducers } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import * as reducer from "./modules";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist:[]
  // stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};
const reducers = combineReducers({
  ...reducer
});
const myPersistReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  // 合并多个Slice
  reducer: myPersistReducer,
  // 不加他 会报错
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});
export const persistor = persistStore(store);

// configureStore 创建一个 redux 数据


export default store;
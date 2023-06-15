import { configureStore } from "@reduxjs/toolkit";
// import persistStore from "redux-persist/es/persistStore";
import { reducer } from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,  
  whitelist: ["auth", "cart", "profile"],
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);

import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import cartSlice from "./CartSlice";
import productSlice from "./ProductSlice";

export const reducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  product: productSlice,
});

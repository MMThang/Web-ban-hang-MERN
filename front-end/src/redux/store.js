import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
// import productReducer from "./slices/productSlice"; BỎ HOANG

export const store = configureStore({
  reducer: {
    user: userReducer,
    // product: productReducer, BỎ HOANG
  },
});

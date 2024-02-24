import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/user/UserSlice.js";
import CartReducer from "./features/cart/CartSlice.js";

const store = configureStore({
  reducer: {
    user: UserReducer,
    cart: CartReducer,
  },
});
export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
// import cartReducer from './cartSlice';

const store = configureStore({
  reducer: { authReducer, cartReducer },
});

export default store;

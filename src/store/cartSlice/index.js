import { createAsyncThunk } from '@reduxjs/toolkit';
import { DATA_CART, STEP_CART, TOTAL_CART } from 'src/constants/configs';

import { getListProductCarClientApi } from 'src/libs/apis/cart';

const { createSlice } = require('@reduxjs/toolkit');

const stepCart = JSON.parse(localStorage.getItem(STEP_CART));
const dataCart = JSON.parse(localStorage.getItem(DATA_CART));
const totalCart = JSON.parse(localStorage.getItem(TOTAL_CART));
const initialState = {
  step: stepCart || 0,
  data: dataCart ? dataCart : [],
  totalCart: totalCart || 0,
  totalPrice: 0,
  pending: false,
  error: {},
};

export const getTotalCart = createAsyncThunk(
  `cart/GET_LIST`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListProductCarClientApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    actionUpdateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.data.findIndex(
        (item) => item.id_chi_tiet_san_pham === id
      );
      if (index !== -1) {
        state.step =
          state.step - Number(state.data[index].quantity) + Number(quantity);
        state.data[index].quantity = quantity;
      }
      localStorage.setItem(DATA_CART, JSON.stringify(state.data));
      localStorage.setItem(STEP_CART, state.step);
    },
    actionDelete(state, action) {
      const { id } = action.payload;
      const index = state.data.findIndex(
        (item) => item.id_chi_tiet_san_pham === id
      );
      if (index !== -1) {
        state.step = state.step - Number(state.data[index].quantity);
        state.data.splice(index, 1);
      }
      localStorage.setItem(DATA_CART, JSON.stringify(state.data));
      localStorage.setItem(STEP_CART, state.step);
    },
    actionTotalCart(state, action) {
      state.totalCart = action.payload;
      localStorage.setItem(TOTAL_CART, state.totalCart);
    },
    actionAddToCart: (state, action) => {
      const { data, step } = action.payload;
      const index =
        state.data &&
        state.data.findIndex((item) => {
          return item?.data?.id === data?.data?.id;
        });
      if (
        index !== -1 &&
        state.data[index].color === data.color &&
        state.data[index].sizeSubmit === data.sizeSubmit
      ) {
        state.data[index].quantity =
          Number(state.data[index].quantity) + Number(step);
      } else {
        state.data.push({ ...data, quantity: Number(step) });
      }
      state.step = Number(state.step) + Number(step);
      localStorage.setItem(STEP_CART, state.step);
      localStorage.setItem(DATA_CART, JSON.stringify(state.data));
    },
    actionResetCart: (state) => {
      state.step = 0;
      state.data = [];
      localStorage.setItem(STEP_CART, state.step);
      localStorage.setItem(DATA_CART, JSON.stringify(state.data));
    },
  },

  extraReducers: {
    [getTotalCart.pending]: (state) => {
      state.pending = true;
    },
    [getTotalCart.rejected]: (state, action) => {
      state.pending = false;
    },
    [getTotalCart.fulfilled]: (state, action) => {
      state.totalCart = action.payload.data.cart.item?.length;
      state.pending = false;
    },
  },
});

const { reducer: cartReducer } = cartSlice;
export const {
  actionAddToCart,
  actionDelete,
  actionUpdateQuantity,
  actionTotalCart,
  actionResetCart,
} = cartSlice.actions;
export default cartReducer;

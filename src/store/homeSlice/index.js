import { createAsyncThunk } from '@reduxjs/toolkit';

import webStorage from 'src/utils/webStorage';

import { getViewHomeApi } from 'src/libs/apis/home';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  home: {},
  pending: false,
  error: {},
};

export const getDataHome = createAsyncThunk(
  `cart/GET_Home`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getViewHomeApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,

  reducers: {},

  extraReducers: {
    [getDataHome.pending]: (state) => {
      state.pending = true;
    },
    [getDataHome.rejected]: (state, action) => {
      state.pending = false;
    },
    [getDataHome.fulfilled]: (state, action) => {
      state.totalCart = action.payload.data;
      state.pending = false;
    },
  },
});

const { reducer: homeReducer } = homeSlice;
// export const { actionStepCart, actionUpdateOrderPendingId } = homeSlice.actions;
export default homeReducer;

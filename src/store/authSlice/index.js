import webStorage from 'src/utils/webStorage';
import { USER_INFO, IS_AUTH } from '../../constants/configs';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const { createSlice } = require('@reduxjs/toolkit');

const isAuthFromStorage = webStorage.get(IS_AUTH);
const userInfoFromStorage = webStorage.get(USER_INFO);
const initialState = {
  isAuth: isAuthFromStorage,
  redirect: '/login',
  userInfo: userInfoFromStorage,
  error: {},
  toast: '',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,

  reducers: {
    actionRedirect: (state, action) => {
      state.redirect = action.payload;
    },
    actionAuthentication: (state, action) => {
      state.isHandle = action.payload?.isHandle;
      state.redirect = action.payload?.redirect;
    },

    actionLogin: (state, action) => {
      state.isAuth = action.payload?.isAuth;
      state.userInfo = action.payload?.userInfo;
      webStorage.set(IS_AUTH, action.payload?.isAuth);
      webStorage.set(USER_INFO, action.payload?.userInfo);
      webStorage.setToken(action.payload?.token);
    },
    actionUpdateMe: (state, action) => {
      state.userInfo = action.payload?.userInfo;
      webStorage.set(USER_INFO, action.payload?.userInfo);
    },

    actionLogout: (state) => {
      state.isAuth = false;
      state.userInfo = {};
      webStorage.removeAll();
      // remove all local storage
      localStorage.clear();
      <Navigate to="/login" replace={true} />;
    },
    actionLoading: (state, action) => {
      state.loading = action.payload?.loading;
    },
    actionToast: (state, action) => {
      state.toast = action?.payload?.title;
      if (action?.payload?.type) {
        toast[action?.payload?.type](action?.payload?.title);
      } else {
        toast(action?.payload?.title);
      }
    },
  },

  extraReducers: {},
});

const { reducer: authReducer } = authSlice;
export const {
  actionAuthentication,
  actionLogin,
  actionLogout,
  actionToast,
  actionLoading,
  actionRedirect,
  actionUpdateMe,
} = authSlice.actions;
export default authReducer;

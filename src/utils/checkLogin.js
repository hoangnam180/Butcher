export const checkLogin = (dataUser) => {
  return !!dataUser?.userInfo && dataUser?.isAuth === true;
};

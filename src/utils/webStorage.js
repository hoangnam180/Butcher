import Cookies from 'js-cookie';
import _isString from 'lodash/isString';
import { ACCESS_TOKEN } from '../constants/configs';

const webStorage = {
  set(key, rawValue, option) {
    const value = _isString(rawValue) ? rawValue : JSON?.stringify(rawValue);

    Cookies.set(key, value, option);
  },
  get(key) {
    const value = Cookies.get(key);

    try {
      return JSON?.parse(value);
    } catch {
      return value;
    }
  },

  remove(key) {
    Cookies.remove(key);
  },

  removeAll() {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  },

  setToken(value, option) {
    this.set(ACCESS_TOKEN, value, option);
  },

  getToken() {
    return this.get(ACCESS_TOKEN);
  },
};

export default webStorage;

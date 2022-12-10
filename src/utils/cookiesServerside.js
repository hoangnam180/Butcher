import nookies from 'nookies';

// Get parse
const getCookiesByKey = (context, key) => nookies.get(context)[key];

// Set
const setCookiesByKey = (context, key, value) => {
  nookies.set(context, key, 'value', value);
};

// Delete
// const deleteCookiesByKey = (context, key) => nookies.destroy(ctx, key);

export { getCookiesByKey, setCookiesByKey };

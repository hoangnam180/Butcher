import routes from 'src/configs/router';
import Page404 from 'src/pages/404page';
import Cart from 'src/pages/cart';
import History from 'src/pages/history';
import Checkout from 'src/pages/checkout';
import Home from 'src/pages/home';
import Login from 'src/components/Auth/login';
import SignUp from 'src/components/Auth/signUp';
import ProductByCategory from 'src/pages/productbyCategory';
import HistoryDetail from 'src/pages/historyDetail';
// Public routes
const publicRoutes = [
  {
    path: routes.home,
    component: Home,
  },
  {
    path: routes.product,
    component: ProductByCategory,
  },

  {
    path: routes.cart,
    component: Cart,
  },
  {
    path: routes.checkout,
    component: Checkout,
  },

  {
    path: routes.login,
    component: Login,
  },
  {
    path: routes.signup,
    component: SignUp,
  },
  {
    path: routes.history,
    component: History,
  },
  {
    path: routes.historyDetail,
    component: HistoryDetail,
  },
  { path: '*', component: Page404 },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };

import routes from 'src/configs/router';
import Page404 from 'src/pages/404page';
import Cart from 'src/pages/cart';
import Checkout from 'src/pages/checkout';
import Home from 'src/pages/home';
import SingleProduct from 'src/pages/product';
import Profile from 'src/pages/profile';
import Login from 'src/components/Auth/login';
import SignUp from 'src/components/Auth/signUp';
import WithList from 'src/pages/withList';
import EditProfile from 'src/components/common/EditProfile';
// Public routes
const publicRoutes = [
  {
    path: routes.home,
    component: Home,
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
    path: routes.detail,
    component: SingleProduct,
    children: [
      {
        path: routes.singleProduct,
        component: SingleProduct,
      },
    ],
  },
  {
    path: routes.login,
    component: Login,
  },
  {
    path: routes.signup,
    component: SignUp,
  },

  { path: '*', component: Page404 },
];

// Private routes
const privateRoutes = [
  {
    path: routes.profile,
    component: Profile,
  },
  {
    path: routes.withList,
    component: WithList,
  },
  {
    path: routes.editProfile,
    component: EditProfile,
  },
];

export { publicRoutes, privateRoutes };

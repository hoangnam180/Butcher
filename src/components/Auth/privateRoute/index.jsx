import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routes from 'src/configs/router';
import LayoutDefault from 'src/layouts/LayoutDefault';
import { checkLogin } from 'src/utils/checkLogin';

export default function PrivateRoute({ children }) {
  const data = useSelector((state) => state?.authReducer);
  const isLogin = checkLogin(data);
  return isLogin === true ? (
    <LayoutDefault>{children}</LayoutDefault>
  ) : (
    <Navigate to={routes.login} replace={true} />
  );
}

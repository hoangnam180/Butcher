import { useForm } from 'react-hook-form';
import { loginApi } from 'src/libs/apis/auth';
import { useDispatch } from 'react-redux';
import { actionLoading, actionLogin, actionToast } from 'src/store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import routes from 'src/configs/router';

function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      dispatch(actionLoading({ loading: true }));
      const res = await loginApi(data);
      dispatch(actionLoading({ loading: false }));
      if (res?.status === 'success') {
        const payload = {
          userInfo: res?.user,
          isAuth: true,
          token: res?.access_token,
        };
        dispatch(actionLogin(payload));
        dispatch(
          actionToast({ title: 'Login Successfully!', type: 'success' })
        );
        navigation('/');
        reset();
      } else {
        dispatch(
          actionToast({ title: 'Wrong Password or UserName!', type: 'error' })
        );
      }
    } catch (err) {
      dispatch(
        actionToast({ title: 'Wrong Password or UserName!', type: 'error' })
      );
      dispatch(actionLoading({ loading: false }));
    }
  };

  return (
    <div className="login-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h2 className="mb-2">Login</h2>
                  <p className="lead">
                    Don’t have an account?{' '}
                    <Link to={routes.signup}>Create a free account</Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-4">
                    <label htmlFor="username">Enter username</label>
                    <input
                      tabIndex={1}
                      {...register('username', { required: true })}
                      id="username"
                      type="text"
                      className="form-control"
                      placeholder="Enter Username"
                    />
                    {errors.username && (
                      <span className="text-danger">Please type username</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Enter Password</label>
                    <Link className="float-right" to={routes.forgot}>
                      Forget password?
                    </Link>
                    <input
                      tabIndex={2}
                      {...register('password', { required: true })}
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                    />{' '}
                    {errors.password && (
                      <span className="text-danger">Please type password</span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-main mt-3 btn-block">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

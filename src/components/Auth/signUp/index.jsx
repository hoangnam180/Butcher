import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'src/configs/router';
import { signUpApi } from 'src/libs/apis/auth';
import { actionLoading, actionToast } from 'src/store/authSlice';

function SignUp() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      dispatch(actionLoading({ loading: true }));
      const res = await signUpApi(data);
      dispatch(actionLoading({ loading: false }));
      if (res?.status === 'success') {
        dispatch(
          actionToast({
            title: 'Please go to mail to authenticate !',
            type: 'success',
          })
        );
      } else {
        dispatch(actionToast({ title: 'Register Error!', type: 'error' }));
      }
      reset();
    } catch (err) {
      dispatch(actionToast({ title: 'Register Error!', type: 'error' }));
      dispatch(actionLoading({ loading: false }));
      reset();
    }
  };
  return (
    <div className="signUp-container">
      <div className="account section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-form border p-5">
                <div className="text-center heading">
                  <h2 className="mb-2">Sign Up</h2>
                  <p className="lead">
                    Already have an account? <Link to="/login"> Login now</Link>
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-4">
                    <label htmlFor="email">Enter Email Address</label>
                    <input
                      {...register('email', { required: true })}
                      id="email"
                      type="text"
                      className="form-control"
                      placeholder="Enter Email Address"
                    />
                    {errors.email && (
                      <span className="text-danger">Please type email</span>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="username">Enter username</label>
                    <Link className="float-right" to={routes.forgot}>
                      Forget password?
                    </Link>
                    <input
                      {...register('username', { required: true })}
                      id="username"
                      type="text"
                      className="form-control"
                      placeholder="Enter Password"
                    />
                    {errors.username && (
                      <span className="text-danger">Please type username</span>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Enter Password</label>
                    <input
                      {...register('password', { required: true })}
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                    />
                    {errors.password && (
                      <span className="text-danger">Please type password</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="re_password">Confirm Password</label>
                    <input
                      {...register('re_password', {
                        required: true,
                        validate: (val) => {
                          if (watch('password') !== val) {
                            return 'Your passwords do no match';
                          }
                        },
                      })}
                      id="confirm"
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />

                    {errors.confirm?.message && (
                      <span className="text-danger">
                        {errors.re_password?.message}
                      </span>
                    )}
                    {errors.re_password && (
                      <span className="text-danger">
                        Please type confirm password
                      </span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-main mt-3 btn-block">
                    Signup
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
export default SignUp;

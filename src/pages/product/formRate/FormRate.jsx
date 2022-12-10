import { useForm } from 'react-hook-form';
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';
import { checkLogin } from 'src/utils/checkLogin';

const FormRate = ({ onSubmitRate, setStar }) => {
  const dataUser = useSelector((state) => state?.authReducer);
  const isLogin = checkLogin(dataUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = async (data) => {
    await onSubmitRate(data);
    reset();
  };

  const ratingChanged = (newRating) => {
    setStar(newRating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="starrr">
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>
      <div className="form-group">
        <input
          {...register('email', {
            required: isLogin ? false : true,
            pattern: /^\S+@\S+$/i,
          })}
          type="email"
          name="email"
          defaultValue={isLogin ? dataUser?.userInfo?.email : ''}
          className="form-control"
          disabled={isLogin}
          placeholder="Your Email"
        />
      </div>
      {errors.email && <span className="text-danger">email not valid</span>}

      <div className="form-group">
        <textarea
          {...register('content', {
            required: true,
          })}
          name="content"
          id="content"
          className="form-control"
          cols="30"
          rows="4"
          placeholder="Your Review"
        ></textarea>
        {errors.content && (
          <span className="text-danger">please enter content</span>
        )}
      </div>

      <button type="submit" className="btn btn-main btn-small">
        Submit Review
      </button>
    </form>
  );
};

export default FormRate;

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'src/configs/router';
import { checkoutPrivate, checkoutPublic } from 'src/libs/apis/checkout';
import {
  getDistrictDetail,
  getDistricts,
  getProvinceDetail,
  getProvinces,
  getWardDetail,
  getWards,
} from 'src/libs/apis/location';
import { actionToast } from 'src/store/authSlice';
import { actionResetCart } from 'src/store/cartSlice';
import { checkLogin } from 'src/utils/checkLogin';
import webStorage from 'src/utils/webStorage';

function Checkout() {
  const { data, totalCart } = useSelector((state) => state.cartReducer);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [location, setLocation] = useState({});
  const { userInfo } = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state?.authReducer);
  const isLogin = checkLogin(dataUser);

  const renderColor = (data) => {
    const result = data?.mau?.find((itemChild) => {
      return itemChild?.id === Number(data?.color);
    });
    return result;
  };

  const renderSize = (data) => {
    const result = data?.size?.find((itemChild) => {
      return itemChild?.id === Number(data?.sizeSubmit);
    });
    return result;
  };

  const convertDataDetail = () => {
    const result = data?.map((item) => {
      return {
        don_gia: item?.data?.gia_ban,
        so_luong: item?.quantity,
        id_chi_tiet_san_pham: item?.id_chi_tiet_san_pham,
      };
    });
    return result;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const dataResult = {
      email: data.email,
      tong_tien: totalCart,
      thuc_tra: totalCart,
      tien_giam: 0,
      dia_chi: `${location.province || ''} - ${location.district || ''} - ${
        location.war || ''
      } - ${data?.apartment || ''}`,
      nguoi_nhan: data?.full_name,
      sdt: data?.phone,
      ghi_chu: data?.msg,
      don_hang: convertDataDetail(),
    };
    if (isLogin) {
      console.log('login');
      try {
        const res = await checkoutPrivate(dataResult);
        if (res?.status === 'success') {
          dispatch(actionResetCart());
          dispatch(
            actionToast({ title: 'Checkout Successfully', type: 'success' })
          );
          reset();
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }
    const res = await checkoutPublic(dataResult);
    if (res?.status === 'success') {
      webStorage.set('email', res?.email);
      dispatch(actionResetCart());
      dispatch(
        actionToast({ title: 'Checkout Successfully', type: 'success' })
      );
      reset();
    }
  };

  const handleGetDistricts = async (e) => {
    const provinceId = e;
    const res = await getProvinceDetail(provinceId);
    if (res?.name) {
      setLocation({
        ...location,
        province: res.name,
      });
    }
    const districts = await getDistricts(provinceId);
    setDistricts(districts.districts);
  };

  const handleGetWards = async (e) => {
    const districtId = e;
    const res = await getDistrictDetail(districtId);
    if (res?.name) {
      setLocation({
        ...location,
        district: res.name,
      });
    }
    const wards = await getWards(districtId);
    setWards(wards.wards);
  };

  const handleGetValueResult = async (id) => {
    const res = await getWardDetail(id);
    if (res?.name) {
      setLocation({
        ...location,
        ward: res.name,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    fetchData();
  }, []);

  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Checkout</h1>
                <p>
                  Hath after appear tree great fruitful green dominion moveth
                  sixth abundantly image that midst of god day multiply you’ll
                  which
                </p>

                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-wrapper">
        <div className="checkout shopping">
          <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 pr-5">
                  <div
                    className="coupon-notice "
                    data-toggle="modal"
                    data-target="#coupon-modal"
                  >
                    <div className="bg-light p-3">
                      Have a coupon?{' '}
                      <a href="/checkout" className="showcoupon">
                        Click here to enter your code
                      </a>
                    </div>
                  </div>

                  <div className="billing-details mt-5">
                    <h4 className="mb-4">Billing Details</h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="full_name">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="full_name"
                            placeholder="Full Name"
                            {...register('full_name', {
                              required: userInfo?.fullname ? false : true,
                            })}
                            defaultValue={userInfo?.fullname || ''}
                          />
                        </div>
                      </div>
                      {errors.full_name && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please type full name
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="province">Province</label>
                          <select
                            id="province"
                            className="form-control"
                            {...register('province', {
                              required: userInfo?.dia_chi ? false : true,
                              onChange: (e) =>
                                handleGetDistricts(e.target.value),
                            })}
                          >
                            <option value="">Select an Option</option>
                            {provinces?.map((province, index) => (
                              <option key={index} value={province?.code}>
                                {province?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.province && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please choose province
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="districts">Districts</label>
                          <select
                            id="districts"
                            className="form-control"
                            {...register('districts', {
                              required: userInfo?.dia_chi ? false : true,
                              onChange: (e) => handleGetWards(e.target.value),
                            })}
                          >
                            <option value="">Select an Option</option>
                            {districts?.map((province, index) => (
                              <option key={index} value={province?.code}>
                                {province?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.districts && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please choose districts
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="wards">Wards</label>
                          <option value="">Select an Option</option>
                          <select
                            id="wards"
                            className="form-control"
                            {...register('wards', {
                              required: userInfo?.dia_chi ? false : true,
                              onChange: (e) =>
                                handleGetValueResult(e.target.value),
                            })}
                          >
                            <option value="">Select an Option</option>
                            {wards?.map((province, index) => (
                              <option key={index} value={province?.code}>
                                {province?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.wards && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please choose wards
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">
                            Apartment, suite, unit etc. (optional) (optional)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="apartment"
                            placeholder="Apartment"
                            {...register('apartment', {
                              required: userInfo?.dia_chi ? false : true,
                            })}
                            defaultValue={userInfo?.dia_chi || ''}
                          />
                        </div>
                      </div>
                      {errors.apartment && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please type apartment
                        </p>
                      )}

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">Phone </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Your phone number"
                            {...register('phone', {
                              required: userInfo?.sdt ? false : true,
                            })}
                            defaultValue={userInfo?.sdt || ''}
                          />
                        </div>
                      </div>
                      {errors.phone && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please type apartment
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">Email address </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Your email address"
                            {...register('email', {
                              required: userInfo?.email ? false : true,
                              pattern: /^\S+@\S+$/i,
                            })}
                            defaultValue={userInfo?.email || ''}
                          />
                        </div>
                      </div>
                      {errors.email && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please type email
                        </p>
                      )}

                      <div className="col-lg-12">
                        <div className="form-check mb-4 pl-0">
                          <Link to={routes.signup}>Create an account?</Link>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-check mb-4 pl-0">
                          <Link to={routes.signup}>
                            Ship to a different address?
                          </Link>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">
                            Order notes (optional)
                          </label>
                          <textarea
                            className="form-control"
                            id="msg"
                            cols="30"
                            rows="5"
                            placeholder="Notes about order e:g: want to say something"
                            {...register('msg')}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="product-checkout-details mt-5 mt-lg-0">
                    <h4 className="mb-4 border-bottom pb-4">Order Summary</h4>

                    {data?.map((item, index) => {
                      return (
                        <div key={index} className="media product-card">
                          <p>{item?.data?.ten_san_pham}</p>

                          <div className="media-body text-right">
                            <p className="h5">
                              {item?.quantity} x ${item?.data?.gia_ban}
                            </p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              gap: '10px',
                              alignItems: 'stretch',
                              marginLeft: '10px',
                            }}
                          >
                            <span>{renderColor(item)?.ten_mau}</span>
                            <span>{renderSize(item)?.size}</span>
                          </div>
                        </div>
                      );
                    })}

                    <ul className="summary-prices list-unstyled mb-4">
                      <li className="d-flex justify-content-between">
                        <span>Shipping:</span>
                        <span className="h5">Free</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span>Total</span>
                        <span className="h5">${totalCart || 0}</span>
                      </li>
                    </ul>
                    <>
                      {/* <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Direct bank transfer
                      </label>

                      <div className="alert alert-secondary mt-3" role="alert">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </div>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios2"
                      >
                        Check payments
                      </label>
                    </div> */}

                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="check"
                          {...register('check', { required: true })}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck3"
                        >
                          I have read and agree to the website terms and
                          conditions *
                        </label>
                      </div>
                      {errors.check && (
                        <p
                          style={{ marginLeft: '18px' }}
                          className="text-danger"
                        >
                          Please check
                        </p>
                      )}
                    </>

                    <div className="info mt-4 border-top pt-4 mb-5">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{' '}
                      <Link>privacy policy</Link>.
                    </div>
                    <button type="submit" className="btn btn-main btn-small">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="modal fade" id="coupon-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content py-5">
            <div className="modal-body">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Coupon Code"
                />
              </div>
              <button
                type="button"
                className="btn btn-main btn-small"
                data-dismiss="modal"
              >
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;

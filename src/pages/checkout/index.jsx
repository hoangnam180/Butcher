import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const convertDataDetail = () => {
    const result = data?.map((item) => {
      return {
        don_gia: item?.gia_sp,
        so_luong: item?.quantity,
        id: item?._id,
        ten_sp: item?.ten_sp,
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
      tong_tien: totalCart,
      dia_chi: `${location.province || ''} - ${location.district || ''} - ${
        location.ward || ''
      } - ${data?.apartment || ''}`,
      nguoi_nhan: data?.full_name,
      sdt: data?.phone,
      ghi_chu: data?.msg,
      gio_hang: convertDataDetail(),
    };
    const res = await checkoutPublic(dataResult);
    if (res?.status === 200) {
      webStorage.set('phone', res?.data.sdt);
      dispatch(actionResetCart());
      dispatch(actionToast({ title: 'Đặt hàng thành công', type: 'success' }));
      reset();
      navigate(routes.history);
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
                <h1 className="mb-3">Thanh toán</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={routes.home}>Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Thanh toán
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
                  <div className="billing-details mt-5">
                    <h4 className="mb-4">Chi tiết hóa đơn</h4>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="full_name">Họ tên</label>
                          <input
                            type="text"
                            className="form-control"
                            id="full_name"
                            placeholder="Họ tên"
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
                          Hãy nhập tên của bạn
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="province">Tỉnh</label>
                          <select
                            id="province"
                            className="form-control"
                            {...register('province', {
                              required: userInfo?.dia_chi ? false : true,
                              onChange: (e) =>
                                handleGetDistricts(e.target.value),
                            })}
                          >
                            <option value="">Chọn Tỉnh</option>
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
                          Hãy chọn tỉnh
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="districts">Huyện</label>
                          <select
                            id="districts"
                            className="form-control"
                            {...register('districts', {
                              required: userInfo?.dia_chi ? false : true,
                              onChange: (e) => handleGetWards(e.target.value),
                            })}
                          >
                            <option value="">Chọn Huyện</option>
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
                          Hãy chọn huyện
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="wards">Phường</label>
                          <select
                            id="wards"
                            className="form-control"
                            {...register('wards', {
                              required: userInfo?.dia_chi ? false : true,
                              onChange: (e) =>
                                handleGetValueResult(e.target.value),
                            })}
                          >
                            <option value="">Chọn phường</option>
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
                          Hãy chọn phường
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">
                            Địa chỉ nhà (Số nhà, tên đường, tên khu vực)
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="apartment"
                            placeholder=" Địa chỉ nhà"
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
                          Hãy nhập địa chỉ nhà
                        </p>
                      )}

                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">Số điện thoại </label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Số điện thoại"
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
                          Hãy nhập số điện thoại
                        </p>
                      )}
                      <div className="col-lg-12">
                        <div className="form-group mb-4">
                          <label htmlFor="first_name">
                            Yêu cầu khác (nếu có)
                          </label>
                          <textarea
                            className="form-control"
                            id="msg"
                            cols="30"
                            rows="5"
                            {...register('msg')}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="product-checkout-details mt-5 mt-lg-0">
                    <h4 className="mb-4 border-bottom pb-4">Thanh toán</h4>

                    {data?.map((item, index) => {
                      return (
                        <div key={index} className="media product-card">
                          <p>{item?.ten_sp}</p>

                          <div className="media-body text-right">
                            <p className="h5">
                              {item?.quantity}(kg) x{' '}
                              {Number(item?.gia_sp).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <ul className="summary-prices list-unstyled mb-4">
                      <li className="d-flex justify-content-between">
                        <span>Ship:</span>
                        <span className="h5">Free trung tâm thành phố</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span>Tổng cộng</span>
                        <span className="h5">
                          {Number(totalCart).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }) || 0}
                        </span>
                      </li>
                    </ul>
                    <button type="submit" className="btn btn-main btn-small">
                      Đặt hàng
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

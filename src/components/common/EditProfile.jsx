import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileApi } from 'src/libs/apis/auth';
import {
  getDistrictDetail,
  getDistricts,
  getProvinceDetail,
  getProvinces,
  getWardDetail,
  getWards,
} from 'src/libs/apis/location';
import { actionToast, actionUpdateMe } from 'src/store/authSlice';

const EditProfile = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [location, setLocation] = useState({});
  const { userInfo } = useSelector((state) => state?.authReducer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const dataResult = {
      ho_ten: data.full_name,
      dia_chi: `${location.province} - ${location.district} - ${location.ward} - ${data?.apartment}`,
      sdt: data?.phone,
    };
    const res = await updateProfileApi(dataResult);
    if (res.status === 'success') {
      const payload = {
        userInfo: {
          ...res?.data,
        },
      };
      dispatch(actionUpdateMe(payload));
      dispatch(
        actionToast({ title: 'Update Profile Successfully!', type: 'success' })
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
    <div className="edit-profile">
      <div className="checkout-container">
        <div className="page-wrapper p-0">
          <div className="checkout shopping">
            <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 pr-2">
                    <div className="billing-details mt-5">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group mb-4">
                            <label htmlFor="full_name">Full Name</label>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container d-flex justify-content-end">
                <button type="submit" className="btn btn-main btn-small">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

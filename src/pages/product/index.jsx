import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { getProductDetail } from 'src/libs/apis/home';
import { addWishListApi } from 'src/libs/apis/wishlist';
import { actionToast } from 'src/store/authSlice';
import { checkLogin } from 'src/utils/checkLogin';

import Loading from 'src/components/common/Loading';

import routes from 'src/configs/router';

import { API_SERVER } from 'src/constants/configs';
import FormRate from './formRate/FormRate';
import {
  ListRate,
  RateProductAuth,
  RateProductPublic,
} from 'src/libs/apis/detail';
import { actionAddToCart } from 'src/store/cartSlice';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [star, setStar] = useState(0);
  const [listRate, setListRate] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [indexActive, setIndexActive] = useState(null);
  const [size, setSize] = useState();
  const [color, setColor] = useState();

  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state?.authReducer);
  const isLogin = checkLogin(dataUser);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    const dataSubmit = { ...data, color };
    const findId = size?.find(
      (item) => item.id === Number(dataSubmit.size)
    )?.id_chi_tiet_san_pham;
    if (!findId || !color) {
      alert('Please choose size or color');
      return;
    }
    const res = 'success';
    if (res === 'success') {
      dispatch(
        actionToast({
          type: 'success',
          title: 'Add to cart successfully',
        })
      );
      dispatch(
        actionAddToCart({
          data: {
            ...product,
            id_chi_tiet_san_pham: findId,
            so_luong: dataSubmit.quantity,
            sizeSubmit: dataSubmit.size,
            color: color,
          },
          step: dataSubmit.quantity,
        })
      );
    }
  };

  const onSubmitRate = async (data) => {
    try {
      if (!isLogin) {
        const res = await RateProductPublic(id, { ...data, sao: star });
        if (res?.status === 'success') {
          setListRate([...listRate, res?.data]);
          dispatch(
            actionToast({
              type: 'success',
              title: 'Rate success',
            })
          );
        }
        return;
      }
      const res = await RateProductAuth(id, { ...data, sao: star });
      if (res?.status === 'success') {
        setListRate([...listRate, res?.data]);
        dispatch(
          actionToast({
            type: 'success',
            title: 'Rate success',
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleListHeart = async (data) => {
    if (!isLogin) {
      dispatch(
        actionToast({
          type: 'error',
          title: 'Please login to use this feature',
        })
      );
      return;
    }
    try {
      const body = { id_san_pham: data.id };
      const res = await addWishListApi(body);
      if (res?.status === 'success') {
        dispatch(
          actionToast({
            type: 'success',
            title: 'Add to wishlist successfully',
          })
        );
      } else if (res?.status === 'erorr' && res?.erorr === 'the same key') {
        dispatch(
          actionToast({
            type: 'error',
            title: 'This product is already in your wishlist',
          })
        );
      }
    } catch (error) {
      dispatch(actionToast({ type: 'error', title: 'Add to wishlist failed' }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getProductDetail(id);
        const rate = await ListRate(id);
        setListRate(rate?.data);
        setProduct(data);
        setQuantity(data?.so_luong?.tong);
        setSize(data?.size);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="single-product-container">
          <div>
            <div classname="single-product-container">
              <div className="container">
                <div className="textbox">
                  <h1 className="title">Góc ẩm thực</h1>
                </div>
              </div>
              <section className="recipe-detail pd">
                <div className="container-w">
                  <div className="feature-banner">
                    <img
                      src="../upload/iblock/ba1/ba18f43be20ae1fe9d3a162cb1d4b62b.JPG"
                      alt="Thịt Thăn Heo Sốt Nấm Tiêu Xanh"
                    />
                  </div>
                </div>
                <div className="container">
                  <div className="ct-detail">
                    <div className="ct-top text-center">
                      <h3 className="cat">Thịt</h3>
                      <h1 className="title-main">
                        Thịt Thăn Heo Sốt Nấm Tiêu Xanh
                      </h1>
                      <div className="list-info">
                        <div className="item">
                          <p>Tủ mát</p>
                          <h5>
                            <span>0 - 4 </span>
                            <sup>o</sup>C
                          </h5>
                        </div>
                        <div className="item">
                          <p>Sơ chế</p>
                          <h5>
                            <span>15 </span>phút
                          </h5>
                        </div>
                        <div className="item">
                          <p>Thời gian Nấu</p>
                          <h5>
                            <span>25 </span>phút
                          </h5>
                        </div>
                        <div className="item">
                          <p>Khẩu phần</p>
                          <h5>
                            <span>4 </span>người
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="video_w">
                      <iframe
                        width={560}
                        height={315}
                        src="https://www.youtube.com/embed/UEFuCcw8di8"
                        frameBorder={0}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />{' '}
                    </div>
                    <div className="ct-bottom">
                      <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <h3>Nguyên liệu:</h3>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <div>
                            <b>
                              <span style={{ color: '#ff0000' }}>
                                Nguyên liệu chính
                              </span>
                            </b>
                            :
                          </div>
                          <div>
                            <br />
                          </div>
                          <div>
                            <b>500gr</b>&nbsp;&nbsp; -&nbsp;&nbsp; Thịt thăn heo{' '}
                            <b>
                              <i>
                                <span style={{ color: '#ff0000' }}>
                                  MEATDeli
                                </span>
                              </i>
                            </b>
                          </div>
                          <div>
                            <b>5gr</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Muối
                          </div>
                          <div>
                            <b>15gr</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Tiêu hạt đập dập
                          </div>
                          <div>
                            <b>10gr</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Lá thyme tươi
                          </div>
                          <div>
                            <b>20gr&nbsp;</b>&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Tỏi băm
                          </div>
                          <div>
                            <b>50gr</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Dầu oliu
                          </div>
                          <div>
                            <br />
                          </div>
                          <div>
                            <b>
                              <span style={{ color: '#ff0000' }}>
                                Nguyên liệu pha xốt
                              </span>
                            </b>
                            :
                          </div>
                          <div>
                            <br />
                          </div>
                          <div>
                            <b>30gr</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Demi Glace
                          </div>
                          <div>
                            <b>300gr&nbsp;</b>&nbsp; -&nbsp;&nbsp;&nbsp; Nước
                            lọc
                          </div>
                          <div>
                            <b>50gr</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Nấm đông cô tươi
                          </div>
                          <div>
                            <b>20gr</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Hành tím
                          </div>
                          <div>
                            <b>50gr</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Whipping cream
                          </div>
                          <div>
                            <b>50gr&nbsp;</b>&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Sữa tươi không đường
                          </div>
                          <div>
                            <b>30gr&nbsp;</b>&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Tiêu xanh
                          </div>
                          <div>
                            <b>10gr&nbsp;</b>&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Bơ lạt
                          </div>
                          <div>
                            <b>50gr&nbsp;</b>&nbsp;&nbsp;&nbsp;
                            -&nbsp;&nbsp;&nbsp; Rượu vang Đỏ
                          </div>
                          <div>
                            <br />
                          </div>
                          <div>
                            <img
                              alt="nguyen-lieu-thit-than-heo-meat-deli-sot-nam-tieu-xanh.jpg"
                              src="../upload/medialibrary/213/2137432501905ea7d02a322113a92a68.jpg"
                              title="nguyen-lieu-thit-than-heo-meat-deli-sot-nam-tieu-xanh.jpg"
                              width={400}
                              height={266}
                            />
                            <br />
                          </div>
                          <div>
                            <br />
                          </div>{' '}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <h3>Sơ chế:</h3>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          - Thăn heo MEATDeli lấy ra từ hộp
                          <br />
                          - Lá thyme bằm sơ.
                          <br />
                          <div>- Tiêu xanh bằm sơ.</div>
                          <div>
                            - Nấm đông cô tươi sơ chế sau đó cắt hạt lựu.
                          </div>
                          - Hành tím cắt hạt lựu.
                          <br />- Bột Demi glace pha nước khuấy cho tan đều rồi
                          nấu sôi thành sốt sệt.{' '}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <h3>Cách làm:</h3>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          - Thăn heo tẩm ướp (nguyên liệu ướp thăn heo) để 30
                          phút.
                          <br />
                          <div>
                            - Làm nóng chảo, áp chảo thịt đã ướp vàng đều hai
                            mặt.
                          </div>
                          <div>
                            - Cho thăn heo vừa áp chảo vào lò nướng 15 phút
                            nhiệt độ 180oC chín vàng.
                          </div>
                          - Pha Xốt: <br />
                          &nbsp; . Đổ dầu vào chảo cho nóng, phi thơm hành tím
                          rồi cho tiêu, nấm xào thơm vàng. <br />
                          &nbsp; . Cho rượu vang đỏ vào nấu cạn sệt tạo mùi
                          thơm, rồi cho sốt Demi Glace đã nấu sệt. Giảm nhỏ lửa.
                          <br />
                          - Cho thêm kem béo, sữa tươi, bơ lạt khi lửa nhỏ nhất,
                          quậy đều tay để tránh tình trạng kết tủa.
                          <br />
                          <br />{' '}
                        </div>
                      </div>
                      <div className="line" />
                      <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          <h3>Phục vụ:</h3>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <div>
                            Thịt thăn cắt lát miếng vừa ăn, ăn kèm với xốt nấm
                            tiêu xanh dùng nóng với bánh mì, xà lách. <br />
                          </div>
                          <div>
                            *{' '}
                            <b>
                              <i>
                                <span style={{ color: '#ff0000' }}>
                                  Mẹo vặt
                                </span>
                              </i>
                            </b>
                            : Để sốt mịn hơn, nên tắt lửa rồi cho kem béo, sữa
                            tươi, bơ lạt, tránh kết tủa.
                          </div>
                          <br />
                          <div>------</div>
                          <div>
                            <br />
                          </div>
                          <div>
                            Xem hệ thống cửa hàng thịt sạch
                            <b>
                              <i>
                                <span style={{ color: '#ff0000' }}>
                                  {' '}
                                  MEATDeli
                                </span>
                              </i>
                            </b>
                            :{' '}
                            <b>
                              <a href="../cua-hang/index.html">tại đây</a>
                            </b>
                          </div>
                          <div>
                            Chi tiết sản phẩm:{' '}
                            <b>
                              <a href="https://meatdeli.com.vn/chi-tiet-san-pham/than-chuot.html">
                                Thịt thăn heo
                              </a>
                              <a href="https://meatdeli.com.vn/chi-tiet-san-pham/than-chuot.html">
                                {' '}
                                MEATDeli
                              </a>
                              <br />
                            </b>
                          </div>
                          <div>
                            Fanpage:
                            <b>
                              {' '}
                              <a href="https://www.facebook.com/ThitsachMEATDeli/">
                                Thịt sạch MEATDeli
                              </a>
                            </b>
                            <br />
                          </div>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="article-relate">
                    <h3 className="title-main text-center">Món ngon khác</h3>
                    <div className="block2">
                      <div className="list-article">
                        <div className="row">
                          <div className="thumb col-md-4 col-sm-4 col-xs-12">
                            <div className="img">
                              <a href="ga-luoc-ngon.html">
                                <img
                                  src="../upload/iblock/3e1/3e1531b78f3be3298dc32bd81e45df5d.jpg"
                                  alt="Gà Luộc LaChanh"
                                />
                              </a>
                            </div>
                            <div className="inforecipe">
                              <h4>Gà</h4>
                              <h3 className="title">
                                <a href="ga-luoc-ngon.html">Gà Luộc LaChanh</a>
                              </h3>
                              <div className="info">
                                <span>Sơ chế: 10 phút</span>
                                <span>Nấu: 35 phút</span>
                              </div>
                            </div>
                          </div>
                          <div className="thumb col-md-4 col-sm-4 col-xs-12">
                            <div className="img">
                              <a href="ga-nuong-muoi-ot.html">
                                <img
                                  src="../upload/iblock/7c2/7c2a0054d59cf5ddde4fb9f79082fa0a.jpg"
                                  alt="Gà Nướng Muối Ớt"
                                />
                              </a>
                            </div>
                            <div className="inforecipe">
                              <h4>Gà</h4>
                              <h3 className="title">
                                <a href="ga-nuong-muoi-ot.html">
                                  Gà Nướng Muối Ớt
                                </a>
                              </h3>
                              <div className="info">
                                <span>Sơ chế: 20 phút</span>
                                <span>Nấu: 60 phút</span>
                              </div>
                            </div>
                          </div>
                          <div className="thumb col-md-4 col-sm-4 col-xs-12">
                            <div className="img">
                              <a href="canh-ga-la-giang.html">
                                <img
                                  src="../upload/iblock/f86/f860ac4699e11f1cc29e2bf3b24fe4fa.jpg"
                                  alt="Canh Gà Lá Giang"
                                />
                              </a>
                            </div>
                            <div className="inforecipe">
                              <h4>Gà</h4>
                              <h3 className="title">
                                <a href="canh-ga-la-giang.html">
                                  Canh Gà Lá Giang
                                </a>
                              </h3>
                              <div className="info">
                                <span>Sơ chế: 20 phút</span>
                                <span>Nấu: 20 phút</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <a href="index.html" className="btn-main center">
                        Xem tất cả
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            ) );
          </div>
        </div>
      )}
    </>
  );
}
export default SingleProduct;

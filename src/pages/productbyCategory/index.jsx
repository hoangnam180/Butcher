import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import { getCategories, getProductsByCategory } from 'src/libs/apis/home';
import { API_SERVER } from 'src/constants/configs';
import { useDispatch } from 'react-redux';
import { actionAddToCart } from 'src/store/cartSlice';
import { actionToast } from 'src/store/authSlice';
function ProductByCategory() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const navigation = useNavigate();
  const refBox = useRef(null);
  const dispatch = useDispatch();

  const handleClickCategory = (id) => {
    navigation(`/products/${id}`);
  };
  const handleAddtocart = (data) => {
    dispatch(
      actionAddToCart({
        data,
        step: 1,
      })
    );
    dispatch(
      actionToast({ title: 'Thêm vào giỏ hàng thành công!', type: 'success' })
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProductsByCategory(params.id);
        setProducts(res.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCategory = await getCategories();
        setCategories(resCategory.data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main id="page-wrapper" className="products productspage aboutpage">
          <section className="banner-top jarallax">
            <img
              src="../upload/iblock/38b/38bb60c4222659e3827f10304d6ee22a.jpg"
              alt="Sản phẩm"
              className="jarallax-img"
            />
            <div className="container">
              <div className="textbox">
                <h1 className="title">Sản phẩm</h1>
              </div>
            </div>
          </section>
          <section className="pdHome">
            <div className="container">
              <div className="textbox text-center">
                <h2 className="title-main lowercase">CHỌN THỊT SẠCH</h2>
                <p></p>
                <div>
                  Từng miếng thịt được chọn lọc và bảo quản xuyên suốt đến tận
                  tay người mua, giúp giữ trọn dưỡng chất cùng độ ngon tối ưu
                  của thịt.
                </div>
                <h4 style={{ textAlign: 'center' }}>
                  {' '}
                  <span style={{ color: '#ff0000' }}>
                    <b>Đặt mua thịt sạch online</b>
                  </span>{' '}
                  - Chúng tôi giao hàng đến tận nhà cho bạn <br />
                </h4>
                <h4 style={{ textAlign: 'center' }}>
                  <br />
                </h4>
                <h4 style={{ textAlign: 'center' }}>
                  <Link to="#">
                    <img
                      alt="button_final.jpg"
                      src="../upload/medialibrary/ce4/ce46402aecdd067ca0c56f812c395f99.jpg"
                      title="button_final.jpg"
                      width={300}
                      height={132}
                    />
                  </Link>
                  <br />
                </h4>{' '}
                <p />
              </div>{' '}
              <div className="filterProductBox nocat">
                <div className="filterPd selectbox">
                  <div className="head">
                    <p>Sản phẩm</p>
                    <div className="inner">
                      <span>Thịt heo</span>
                    </div>
                  </div>
                </div>
                <div className="filterCat hidden-xs">
                  <div className="catProduct catProduct1 active">
                    <ul className="cat cat1 active">
                      <li onClick={() => navigation('/')}>
                        <span>Tất cả</span>
                      </li>
                      {categories.map((item) => (
                        <li
                          onClick={() => handleClickCategory(item?._id)}
                          key={item?._id}
                          className={item?._id === params.id ? 'active' : ''}
                        >
                          <span>{item?.ten_dm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="filterCatMobile selectbox hidden-lg hidden-md hidden-sm">
                  <div className="catProduct catProduct1 active">
                    <div
                      className="head mobile"
                      onClick={() => {
                        refBox.current.classList.toggle('active');
                      }}
                    >
                      <div className="inner">
                        <span>Tất cả</span>
                      </div>
                    </div>
                    <div className="body">
                      <ul ref={refBox}>
                        <li onClick={() => navigation('/')}>
                          <span>Tất cả</span>
                        </li>
                        {categories.map((item) => (
                          <li
                            onClick={() => handleClickCategory(item?._id)}
                            key={item?._id}
                          >
                            <span>{item?.ten_dm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="productDetail">
                <div className="loading-pd">
                  <img
                    src="../bitrix/templates/Meatdeli/img/loading.svg"
                    alt="loading"
                  />
                </div>
              </div>
            </div>
            <div className="productListing">
              <div className="item">
                <div className="caption">
                  <h3>Tham khảo vị trí thịt muốn mua?</h3>
                  <div
                    data-toggle="modal"
                    data-target="#myModal-suggest"
                    className="btn-main style2"
                  >
                    Xác định vị trí thịt
                  </div>
                </div>
              </div>
              {products.map((item) => (
                <div
                  className="item"
                  key={item?._id}
                  onClick={() => {
                    handleAddtocart(item);
                  }}
                >
                  <div className="img">
                    <Link to="#" title="Chả bì que ớt xiêm xanh">
                      <img
                        src={`${API_SERVER}/${item?.avatar}`}
                        alt={item?.ten_sp}
                      />
                    </Link>
                  </div>
                  <div className="caption">
                    <h3 className="title">
                      <Link className="title" to="#" title={item?.ten_sp}>
                        {item?.ten_sp}
                      </Link>
                    </h3>
                    <Link to="#" className="btn-buynow white">
                      Mua ngay
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </>
  );
}
export default ProductByCategory;

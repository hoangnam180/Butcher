import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
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
                  Từng miếng thịt được chọn lọc và bảo quản xuyên suốt ở nhiệt
                  độ 0 – 4°C từ nhà máy đến tận tay người mua, giúp giữ trọn
                  dưỡng chất cùng độ ngon tối ưu của thịt.
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
                      <li className="active">
                        <span>Tất cả</span>
                      </li>
                      <li>
                        <span>Thịt</span>
                      </li>
                      <li>
                        <span>Nạc</span>
                      </li>
                      <li>
                        <span>Sườn</span>
                      </li>
                      <li>
                        <span>Đuôi</span>
                      </li>
                      <li>
                        <span>Giò</span>
                      </li>
                      <li>
                        <span>Lòng heo</span>
                      </li>
                      <li>
                        <span>Thịt chế biến</span>
                      </li>
                      <li>
                        <span>Xương</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="filterCatMobile selectbox hidden-lg hidden-md hidden-sm">
                  <div className="catProduct catProduct1 active">
                    <div className="head">
                      <div className="inner">
                        <span>Tất cả</span>
                      </div>
                    </div>
                    <div className="body">
                      <ul>
                        <li className="active">
                          <span>Tất cả</span>
                        </li>
                        <li>
                          <span>Thịt</span>
                        </li>
                        <li>
                          <span>Nạc</span>
                        </li>
                        <li>
                          <span>Sườn</span>
                        </li>
                        <li>
                          <span>Đuôi</span>
                        </li>
                        <li>
                          <span>Giò</span>
                        </li>
                        <li>
                          <span>Lòng heo</span>
                        </li>
                        <li>
                          <span>Thịt chế biến</span>
                        </li>
                        <li>
                          <span>Xương</span>
                        </li>
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
                <div className="img">
                  <Link to="#" title="Chả bì que ớt xiêm xanh">
                    <img
                      src="../upload/iblock/15d/15d5dfc86c0c57b3a6f050c603ca9164.png"
                      alt="Chả bì que ớt xiêm xanh"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="Chả bì que ớt xiêm xanh"
                    >
                      Chả bì que ớt xiêm xanh
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Ba rọi rút sườn">
                    <img
                      src="../upload/iblock/e7d/e7d5cbb3fbf0491a994cf8481adef3c4.jpg"
                      alt="[PREMIUM] Ba rọi rút sườn"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="[PREMIUM] Ba rọi rút sườn"
                    >
                      [PREMIUM] Ba rọi rút sườn
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Bắp giò cuộn">
                    <img
                      src="../upload/iblock/b7f/b7f1d6e5c0fa9eed5744b0f3b61202b8.jpg"
                      alt="[PREMIUM] Bắp giò cuộn"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="[PREMIUM] Bắp giò cuộn"
                    >
                      [PREMIUM] Bắp giò cuộn
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="Ba rọi heo chuẩn ngon ">
                    <img
                      src="../upload/iblock/d52/d529b15c64ade07571d0bb3c83e73b8d.jpg"
                      alt="Ba rọi heo chuẩn ngon "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="Ba rọi heo chuẩn ngon "
                    >
                      Ba rọi heo chuẩn ngon{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Sườn thăn ">
                    <img
                      src="../upload/iblock/2fc/2fcaf491887512c267ae0a24e32e7bdb.jpg"
                      alt="[PREMIUM] Sườn thăn "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link className="title" to="#" title="[PREMIUM] Sườn thăn ">
                      [PREMIUM] Sườn thăn{' '}
                    </Link>
                  </h3>
                  <Link
                    to="https://hn-shop.meatdeli.com.vn/products/premium-suon-than-350g?utm_source=web&utm_medium=button&utm_campaign=suonthan"
                    className="btn-buynow white"
                  >
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Nạc nọng">
                    <img
                      src="../upload/iblock/d6d/d6dbb894f4e31e6f184f23232130023d.jpg"
                      alt="[PREMIUM] Nạc nọng"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link className="title" to="#" title="[PREMIUM] Nạc nọng">
                      [PREMIUM] Nạc nọng
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Nạc dăm đầu giòn">
                    <img
                      src="../upload/iblock/24a/24aae681c21ce4edf02c455ba4b7de68.jpg"
                      alt="[PREMIUM] Nạc dăm đầu giòn"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="[PREMIUM] Nạc dăm đầu giòn"
                    >
                      [PREMIUM] Nạc dăm đầu giòn
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Ba rọi heo Đặc biệt ">
                    <img
                      src="../upload/iblock/f19/f1993fdff67e66535fc1a3c892f7e4ae.jpg"
                      alt="[PREMIUM] Ba rọi heo Đặc biệt "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="[PREMIUM] Ba rọi heo Đặc biệt "
                    >
                      [PREMIUM] Ba rọi heo Đặc biệt{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Sườn non">
                    <img
                      src="../upload/iblock/4de/4de9530dd4045ce8e402c5f6b25a61fe.jpg"
                      alt="[PREMIUM] Sườn non"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link className="title" to="#" title="[PREMIUM] Sườn non">
                      [PREMIUM] Sườn non
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Móng giò ">
                    <img
                      src="../upload/iblock/34e/34e496317751d9aa10d85bc60a113927.jpg"
                      alt="[PREMIUM] Móng giò "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link className="title" to="#" title="[PREMIUM] Móng giò ">
                      [PREMIUM] Móng giò{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Sườn St. Louis ">
                    <img
                      src="../upload/iblock/7fd/7fde84642dcd7124fd61ba34e421619c.jpg"
                      alt="[PREMIUM] Sườn St. Louis "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="[PREMIUM] Sườn St. Louis "
                    >
                      [PREMIUM] Sườn St. Louis{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Sụn heo ">
                    <img
                      src="../upload/iblock/54c/54cc2b56ef001a8af99c0efdf0776667.jpg"
                      alt="[PREMIUM] Sụn heo "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link className="title" to="#" title="[PREMIUM] Sụn heo ">
                      [PREMIUM] Sụn heo{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="Chân giò heo rút xương chuẩn ngon ">
                    <img
                      src="../upload/iblock/924/9244609a9eeac34451a5e4134a7b518d.jpg"
                      alt="Chân giò heo rút xương chuẩn ngon "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="Chân giò heo rút xương chuẩn ngon "
                    >
                      Chân giò heo rút xương chuẩn ngon{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="Nạc dăm heo chuẩn ngon ">
                    <img
                      src="../upload/iblock/359/3595b9eef9f407201f123290d8f93c30.jpg"
                      alt="Nạc dăm heo chuẩn ngon "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="Nạc dăm heo chuẩn ngon "
                    >
                      Nạc dăm heo chuẩn ngon{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="Xương cục heo chuẩn ngon ">
                    <img
                      src="../upload/iblock/b85/b85fe673f018df466b66ec769dad42a8.jpg"
                      alt="Xương cục heo chuẩn ngon "
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="Xương cục heo chuẩn ngon "
                    >
                      Xương cục heo chuẩn ngon{' '}
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Sụn heo cắt lát">
                    <img
                      src="../upload/iblock/71b/71ba7240a9e2249b0777c11b9dec75f7.jpg"
                      alt="[PREMIUM] Sụn heo cắt lát"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="[PREMIUM] Sụn heo cắt lát"
                    >
                      [PREMIUM] Sụn heo cắt lát
                    </Link>
                  </h3>
                  <Link
                    to="https://hn-shop.meatdeli.com.vn/products/premium-sun-heo-cat-lat-350g?utm_source=fanpage&utm_medium=post&utm_campaign=sunheocatlat"
                    className="btn-buynow white"
                  >
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="[PREMIUM] Thăn nõn Slim&Fit">
                    <img
                      src="../upload/iblock/4f4/4f4c45ae2462a1c0086e51cf40a8bcd5.jpg"
                      alt="[PREMIUM] Thăn nõn Slim&Fit"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="[PREMIUM] Thăn nõn Slim&Fit"
                    >
                      [PREMIUM] Thăn nõn Slim&amp;Fit
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="Giò lụa sạch Ngự Bảo Hảo hạng">
                    <img
                      src="../upload/iblock/a8c/a8cf925681bd78a56e5976355afbae1b.jpg"
                      alt="Giò lụa sạch Ngự Bảo Hảo hạng"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="Giò lụa sạch Ngự Bảo Hảo hạng"
                    >
                      Giò lụa sạch Ngự Bảo Hảo hạng
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="Chả chiên Ngự Bảo">
                    <img
                      src="../upload/iblock/481/481b49d1b40baf55c7fa39d2aad889ad.jpg"
                      alt="Chả chiên Ngự Bảo"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link className="title" to="#" title="Chả chiên Ngự Bảo">
                      Chả chiên Ngự Bảo
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="img">
                  <Link to="#" title="Chả bì ớt xiêm xanh Ngự Bảo">
                    <img
                      src="../upload/iblock/23b/23b018ba91a155d82dfd147a59704b60.jpg"
                      alt="Chả bì ớt xiêm xanh Ngự Bảo"
                    />
                  </Link>
                </div>
                <div className="caption">
                  <h3 className="title">
                    <Link
                      className="title"
                      to="#"
                      title="Chả bì ớt xiêm xanh Ngự Bảo"
                    >
                      Chả bì ớt xiêm xanh Ngự Bảo
                    </Link>
                  </h3>
                  <Link to="#" className="btn-buynow white">
                    Mua ngay
                  </Link>
                </div>
              </div>
              <div className="item">
                <div className="caption">
                  <h3>Bạn muốn biết về vị trí thịt muốn mua?</h3>
                  <div
                    data-toggle="modal"
                    data-target="#myModal-suggest"
                    className="btn-main style2"
                  >
                    Xác định vị trí thịt
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
export default Home;

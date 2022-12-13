import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import routes from 'src/configs/router';
import { historyCheckoutById } from 'src/libs/apis/checkout';
function HistoryDetail() {
  const [historyDetail, setHistoryDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchHistoryDetail = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const res = await historyCheckoutById(id);
        setHistoryDetail(res?.data);
        setLoading(false);
      } catch {
        console.log('error');
        setLoading(false);
      }
    };
    fetchHistoryDetail();
  }, [id]);
  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Chi tiết đơn hàng</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={routes.home}>Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Chi tiết đơn hàng
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cart shopping pb-5" style={{ minHeight: '45vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="col-lg-7">
                <div className="cart-info card p-4 mt-4">
                  <h4 className="mb-4">Tổng hóa đơn</h4>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex justify-content-between pb-2 mb-3">
                      <h5>Người nhận</h5>
                      <span style={{ maxWidth: '50%' }}>
                        {historyDetail?.nguoi_nhan || ''}
                      </span>
                    </li>
                    <li className="d-flex justify-content-between pb-2 mb-3">
                      <h5>Địa chỉ</h5>
                      <span style={{ maxWidth: '50%' }}>
                        {historyDetail?.dia_chi || ''}
                      </span>
                    </li>
                    <li className="d-flex justify-content-between pb-2 mb-3">
                      <h5>Số điện thoại</h5>
                      <span style={{ maxWidth: '50%' }}>
                        {historyDetail?.sdt || ''}
                      </span>
                    </li>
                    <ul className="list-unstyled mb-4">
                      <h4 className="mb-4">Các sản phẩm đã mua</h4>
                      {historyDetail?.gio_hang?.map((item, index) => (
                        <div key={index}>
                          <h5
                            style={{
                              borderBottom: '2px solid red',
                              fontWeight: '600',
                            }}
                            className="mt-2 pb-3"
                          >
                            Sản phẩm {index + 1}
                          </h5>
                          <li className="d-flex justify-content-between pb-2 mb-3">
                            <h5>tên sản phẩm</h5>
                            <span style={{ maxWidth: '50%' }}>
                              {item?.ten_sp || ''}
                            </span>
                          </li>
                          <li className="d-flex justify-content-between pb-2 mb-3">
                            <h5>Số lượng</h5>
                            <span style={{ maxWidth: '50%' }}>
                              {item?.so_luong || ''} (kg)
                            </span>
                          </li>
                          <li className="d-flex justify-content-between pb-2">
                            <h5>Giá sản phẩm</h5>
                            <span style={{ maxWidth: '50%' }}>
                              {Number(item?.don_gia)?.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </span>
                          </li>
                        </div>
                      ))}
                    </ul>
                    <li className="d-flex justify-content-between pb-2 mb-3">
                      <h5>Giá ship</h5>
                      <span>Free trung tâm thành phố </span>
                    </li>
                    <li className="d-flex justify-content-between pb-2">
                      <h5>Tổng tiền</h5>
                      <span>
                        {Number(historyDetail?.tong_tien)?.toLocaleString(
                          'it-IT',
                          {
                            style: 'currency',
                            currency: 'VND',
                          }
                        )}
                      </span>
                    </li>
                  </ul>
                  <div className="d-flex">
                    {/* <Link
                      to={routes?.checkout}
                      className="btn btn-main btn-small"
                    >
                      Hủy đơn hàng
                    </Link> */}
                    <Link to={routes?.home} className="btn btn-main btn-small">
                      Tiếp tục mua hàng
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
export default HistoryDetail;

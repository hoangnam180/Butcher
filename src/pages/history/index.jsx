import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import routes from 'src/configs/router';
import { useCustomSearchParams } from 'src/hooks/useSeachParams';
import { historyCheckout } from 'src/libs/apis/checkout';
function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const refInput = useRef();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const { phone } = searchParams;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = refInput.current.value;
    if (!value || value?.trim() === '') return;
    setSearchParams({ phone: value });
  };
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!phone) return;
        setLoading(true);
        const res = await historyCheckout({ sdt: phone });
        setHistory(res?.data);
        setLoading(false);
      } catch {
        console.log('error');
        setLoading(false);
      }
    };
    fetchHistory();
  }, [phone]);
  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Lịch sử mua hàng</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={routes.home}>Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Lịch sử mua hàng
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cart shopping pb-5">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-7 col-xl-12">
              <div className="cart-info card p-4 mt-4">
                <h4 className="mb-4">Tìm kiếm</h4>
                <form className="form-inline">
                  <div style={{ width: '55% ' }}>
                    <input
                      text="number"
                      className="form-control"
                      placeholder="Nhập số điện thoại"
                      ref={refInput}
                      style={{ width: '100%' }}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-main btn-small"
                  >
                    Tìm kiếm
                  </button>
                </form>
              </div>
            </div>
          </div>
          <>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {history?.length <= 0 ? (
                  <div className="row justify-content-center">
                    <div className="col-lg-7">
                      <h3 className="mt-4">Số điện thoại này chưa mua hàng</h3>
                    </div>
                  </div>
                ) : (
                  <table
                    className="table shop_table shop_table_responsive cart"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Người đặt</th>
                        <th className="product-name">Địa chỉ</th>
                        <th className="product-price">Số điện thoại</th>
                        <th className="product-subtotal">tổng tiền</th>
                        <th className="product-remove"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {history?.map((item, index) => {
                        return (
                          <tr className="cart_item" key={index}>
                            <td
                              className="product-thumbnail"
                              data-title="Người đặt"
                            >
                              <Link style={{ color: '#333' }}>
                                {item?.nguoi_nhan || 'Không có tên'}
                              </Link>
                            </td>

                            <td className="product-name" data-title="Địa chỉ">
                              <Link>{item?.dia_chi}</Link>
                            </td>

                            <td
                              className="product-price"
                              data-title="Số điện thoại"
                            >
                              <span className="amount">
                                {item?.sdt || 'Không có số điện thoại'}
                              </span>
                            </td>
                            <td
                              className="product-price"
                              data-title="Tổng tiền"
                            >
                              <span className="amount">
                                {Number(item?.tong_tien).toLocaleString(
                                  'it-IT',
                                  {
                                    style: 'currency',
                                    currency: 'VND',
                                  }
                                )}
                              </span>
                            </td>
                            <td
                              className="product-remove"
                              data-title="Chi tiết"
                            >
                              <button className="btn btn-main btn-small">
                                <Link
                                  style={{ color: '#fff' }}
                                  to={routes.history + `/${item?._id}`}
                                >
                                  Chi tiết
                                </Link>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </>
        </div>
      </section>
    </div>
  );
}
export default History;

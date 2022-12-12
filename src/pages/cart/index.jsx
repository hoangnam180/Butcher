import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import {
  actionDelete,
  actionTotalCart,
  actionUpdateQuantity,
} from 'src/store/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { data, totalCart } = useSelector((state) => state?.cartReducer);
  const handleTotalPrice = () => {
    let total = 0;
    data.forEach((item) => {
      total += item?.gia_sp * Number(item?.quantity || 0);
    });

    dispatch(actionTotalCart(total));
  };

  const handleUpdateQuantity = async (id, quantity) => {
    if (id !== 'undefined' && quantity) {
      dispatch(actionUpdateQuantity({ id, quantity }));
    }
  };

  const handleDelete = (id) => {
    dispatch(actionDelete({ id }));
  };

  useEffect(() => {
    handleTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  return (
    <div className="checkout-container">
      <section className="page-header">
        <div className="overly"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="content text-center">
                <h1 className="mb-3">Giỏ hàng</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to={routes.home}>Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Giỏ hàng
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cart shopping page-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="product-list">
                <form className="cart-form">
                  <table
                    className="table shop_table shop_table_responsive cart"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th className="product-thumbnail">hình ảnh</th>
                        <th className="product-name">sản phẩm</th>
                        <th className="product-price">giá tiền</th>
                        <th className="product-quantity pl-4">số ký(kg)</th>
                        <th className="product-subtotal">tổng tiền</th>
                        <th className="product-remove"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((item, index) => {
                        return (
                          <tr className="cart_item" key={index}>
                            <td
                              className="product-thumbnail"
                              data-title="hình ảnh"
                            >
                              <a href="/product-single">
                                <img
                                  style={{ width: '100%', height: '60px' }}
                                  src={`${API_SERVER}/${item?.avatar}`}
                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                  alt=""
                                />
                              </a>
                            </td>

                            <td className="product-name" data-title="sản phẩm">
                              <Link>{item?.ten_sp}</Link>
                            </td>

                            <td className="product-price" data-title="giá tiền">
                              <span className="amount">
                                {
                                  // convert number to price format vnd in js
                                  Number(item?.gia_sp).toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                  })
                                }
                              </span>
                            </td>
                            <td
                              className="product-quantity"
                              data-title="số ký(kg)"
                            >
                              <div className="quantity d-flex align-items-center">
                                <label className="sr-only">số ký(kg)</label>
                                <input
                                  type="number"
                                  id="qty"
                                  className={`input-text qty qty-${index} text`}
                                  min={1}
                                  max={100}
                                  defaultValue={item?.quantity || 1}
                                  title="Qty"
                                  onChange={(e) => {
                                    handleUpdateQuantity(
                                      item?._id,
                                      Number(e.target.value)
                                    );
                                  }}
                                />
                              </div>
                            </td>
                            <td
                              className="product-subtotal"
                              data-title="Tổng tiền"
                            >
                              <span className="amount">
                                {Number(
                                  Number(item?.gia_sp) *
                                    (Number(item?.quantity) || 1)
                                ).toLocaleString('it-IT', {
                                  style: 'currency',
                                  currency: 'VND',
                                })}
                              </span>
                            </td>
                            <td
                              className="product-remove"
                              data-title="Xóa sản phẩm"
                            >
                              <Link
                                className="remove"
                                aria-label="Remove this item"
                                data-product_id="30"
                                data-product_sku=""
                                onClick={() => {
                                  handleDelete(item?._id);
                                }}
                              >
                                ×
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="cart-info card p-4 mt-4">
                <h4 className="mb-4">Tổng hóa đơn</h4>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Giá ship</h5>
                    <span>Free trung tâm thành phố </span>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <h5>Tộng cộng</h5>
                    <span>
                      {totalCart.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </li>
                </ul>
                <Link to={routes?.checkout} className="btn btn-main btn-small">
                  Tiến hành đặt hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Cart;

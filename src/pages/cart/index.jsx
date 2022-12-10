import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import {
  historyCheckout,
  historyCheckoutPrivate,
} from 'src/libs/apis/checkout';
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
      total += item?.data?.gia_ban * Number(item?.quantity || 0);
    });
    dispatch(actionTotalCart(total));
  };
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
  renderColor();
  const handleUpdateQuantity = async (id, quantity) => {
    if (id !== 'undefined' && quantity) {
      dispatch(actionUpdateQuantity({ id, quantity }));
    }
  };

  const handleDelete = (id) => {
    dispatch(actionDelete({ id }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await historyCheckout();
      console.log(res);
    };
    fetchData();
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
                <h1 className="mb-3">Cart</h1>
                Hath after appear tree great fruitful green dominion moveth
                sixth abundantly image that midst of god day multiply you’ll
                which
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb bg-transparent justify-content-center">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Cart
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
                        <th className="product-thumbnail">thumbnail</th>
                        <th className="product-name">Product</th>
                        <th className="product-property">Property</th>
                        <th className="product-price">Price</th>
                        <th className="product-quantity pl-4">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove"> </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data?.map((item, index) => {
                        return (
                          <tr className="cart_item" key={index}>
                            <td
                              className="product-thumbnail"
                              data-title="Thumbnail"
                            >
                              <a href="/product-single">
                                <img
                                  style={{ width: '100%', height: '60px' }}
                                  src={`${API_SERVER}${item?.hinh_anh?.[0]?.hinh_anh}`}
                                  className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                  alt=""
                                />
                              </a>
                            </td>

                            <td className="product-name" data-title="Product">
                              <Link>{item?.data?.ten_san_pham}</Link>
                            </td>

                            <td
                              className="product-property"
                              data-title="Product"
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  alignItems: 'flex-end',
                                }}
                              >
                                <p
                                  style={{
                                    backgroundColor: `${
                                      renderColor(item)?.hex
                                    }`,
                                    width: '30px',
                                    height: '30px',
                                    border: '1px solid #333',
                                    marginTop: 'auto',
                                    position: 'relative',
                                    top: '16px',
                                  }}
                                ></p>
                                <span>{renderSize(item)?.size}</span>
                              </div>
                            </td>

                            <td className="product-price" data-title="Price">
                              <span className="amount">
                                <span className="currencySymbol">
                                  <pre wp-pre-tag-3=""></pre>
                                </span>
                                {item?.data?.gia_ban}
                              </span>
                            </td>
                            <td
                              className="product-quantity"
                              data-title="Quantity"
                            >
                              <div className="quantity d-flex align-items-center">
                                <label className="sr-only">Quantity</label>
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
                                      item?.id_chi_tiet_san_pham,
                                      Number(e.target.value)
                                    );
                                  }}
                                />
                              </div>
                            </td>
                            <td className="product-subtotal" data-title="Total">
                              <span className="amount">
                                <span className="currencySymbol">
                                  <pre wp-pre-tag-3=""></pre>
                                </span>
                                {Number(
                                  Number(item?.data?.gia_ban) *
                                    (Number(item?.quantity) || 1)
                                ).toFixed(2)}
                              </span>
                            </td>
                            <td className="product-remove" data-title="Remove">
                              <Link
                                className="remove"
                                aria-label="Remove this item"
                                data-product_id="30"
                                data-product_sku=""
                                onClick={() => {
                                  handleDelete(item?.id_chi_tiet_san_pham);
                                }}
                              >
                                ×
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan="6" className="actions">
                          <div className="coupon">
                            <input
                              type="text"
                              name="coupon_code"
                              className="input-text form-control"
                              id="coupon_code"
                              defaultValue=""
                              placeholder="Coupon code"
                            />
                            <button
                              type="button"
                              className="btn btn-black btn-small"
                              name="apply_coupon"
                              defaultValue="Apply coupon"
                            >
                              Apply coupon
                            </button>
                            <span className="float-right mt-3 mt-lg-0">
                              <button
                                type="button"
                                className="btn btn-dark btn-small"
                                name="update_cart"
                                defaultValue="Update cart"
                                disabled=""
                              >
                                Update cart
                              </button>
                            </span>
                          </div>
                          <input
                            type="hidden"
                            id="woocommerce-cart-nonce"
                            name="woocommerce-cart-nonce"
                            defaultValue="27da9ce3e8"
                          />
                          <input
                            type="hidden"
                            name="_wp_http_referer"
                            defaultValue="/cart/"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="cart-info card p-4 mt-4">
                <h4 className="mb-4">Cart totals</h4>
                <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between pb-2 mb-3">
                    <h5>Shipping</h5>
                    <span>Free</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <h5>Total</h5>
                    <span>${Number(totalCart || 0)?.toFixed(2) || 0}</span>
                  </li>
                </ul>
                <Link to={routes?.checkout} className="btn btn-main btn-small">
                  Proceed to checkout
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

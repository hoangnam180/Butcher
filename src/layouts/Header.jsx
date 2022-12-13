/* eslint-disable jsx-a11y/img-redundant-alt */
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import routes from 'src/configs/router';

const Header = () => {
  const refMobile = useRef();
  return (
    <header>
      <div className="topmenu">
        <div className="container-w">
          <div className="router">
            <NavLink
              to={routes.home}
              style={{ color: '#fff', fontWeight: '600' }}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to={routes.history}
              style={{
                color: '#fff',
                fontWeight: '600',
                marginLeft: '15px',
              }}
            >
              Lịch sử mua hàng
            </NavLink>
            <NavLink
              to={routes.cart}
              style={{
                color: '#fff',
                fontWeight: '600',
                marginLeft: '15px',
              }}
            >
              Giỏ hàng
            </NavLink>
          </div>
          <div className="bright">
            <p>
              Đặt hàng &amp; giao tận nơi
              <a href="tel:0384190997">0384190997</a>
            </p>
            <div className="divide" />
          </div>
        </div>
      </div>
      <div className="navmobile">
        <div className="container-w">
          <div className="brand">
            <NavLink to={routes.home}>
              <img
                src="../bitrix/templates/Meatdeli/img/logo-mb.png"
                alt="Header Mobile Image"
                className="black"
              />
            </NavLink>{' '}
          </div>
          <div className="btn-nav" id="nav-icon3">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="menu-mobile" ref={refMobile}>
        <div className="inner">
          <div className="callus">
            <a href="tel:0384190997">
              Hotline <span>0384190997</span>
            </a>
          </div>
          <div className="callus">
            <NavLink
              onClick={() => {
                refMobile.current.classList.remove('is-active');
                document
                  .querySelector('.overlay-mobile')
                  .classList.remove('is-active');
                document
                  .querySelector('.btn-nav')
                  .classList.remove('is-active');
              }}
              to={routes.history}
            >
              <span>Lịch sử mua hàng</span>
            </NavLink>
          </div>
          <div className="callus">
            <NavLink
              onClick={() => {
                refMobile.current.classList.remove('is-active');
                document
                  .querySelector('.overlay-mobile')
                  .classList.remove('is-active');
                document
                  .querySelector('.btn-nav')
                  .classList.remove('is-active');
              }}
              to={routes.cart}
            >
              <span>Giỏ hàng</span>
            </NavLink>
          </div>
          <div className="discover">
            <img
              src="../bitrix/templates/Meatdeli/img/meat-discover.png"
              alt="meat-discover"
              className="icon"
            />
            <NavLink
              onClick={() => {
                refMobile.current.classList.remove('is-active');
                document
                  .querySelector('.overlay-mobile')
                  .classList.remove('is-active');
                document
                  .querySelector('.btn-nav')
                  .classList.remove('is-active');
              }}
            >
              <i>
                <img
                  src="../bitrix/templates/Meatdeli/img/arrow-r.png"
                  alt="arrow"
                />
              </i>
              Truy xuất nguồn gốc
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Loading from 'src/components/common/Loading';
import { useSelector } from 'react-redux';

function LayoutDefault({ children }) {
  const loading = useSelector((state) => state.authReducer?.loading);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="wrapper-container">{children}</div>
          <ToastContainer />
        </>
      )}
    </>
  );
}
LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LayoutDefault;

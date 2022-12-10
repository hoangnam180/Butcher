import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import routes from 'src/configs/router';
import { API_SERVER } from 'src/constants/configs';
import { getWishlistApi, deleteWithList } from 'src/libs/apis/wishlist';
import { actionToast } from 'src/store/authSlice';

const WithList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteWithList = async (id) => {
    try {
      setLoadingDelete(true);
      const res = await deleteWithList(id);
      if (res.status === 'success') {
        const newWishlist = wishlist.filter((item) => item.id_yeu_thich !== id);
        setWishlist(newWishlist);
        dispatch(
          actionToast({
            type: 'success',
            message: 'delete success',
          })
        );
        setLoadingDelete(false);
      } else {
        dispatch(
          actionToast({
            type: 'error',
            message: 'delete fail',
          })
        );
        setLoadingDelete(false);
      }
    } catch (error) {
      setLoadingDelete(false);

      dispatch(
        actionToast({
          type: 'error',
          message: 'delete fail',
        })
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getWishlistApi();
        if (res?.status === 'success') {
          setWishlist(res?.data);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="row pl-5 justify-content-center">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div className="row">
                <div className="col-lg-12 widget-featured-entries mt-5 mt-lg-0">
                  <h4 className="mb-4 pb-3">With List</h4>
                </div>
                {/* Column */}
                {wishlist.map((item) => (
                  <div key={item?.id} className="col-lg-4">
                    <div className="widget-featured-entries mt-5 mt-lg-0">
                      <div className="media mb-3">
                        <Link
                          to={`${routes.detail}/${item?.id}`}
                          className="featured-entry-thumb"
                        >
                          <img
                            src={`${API_SERVER}${item?.hinh_anh}`}
                            alt="Product thumb"
                            width="64"
                            className="img-fluid mr-3"
                            style={{ height: '64px  ' }}
                          />
                        </Link>
                        <div className="media-body">
                          <h6 className="featured-entry-title mb-0">
                            <Link to={`${routes.detail}/${item?.id}`}>
                              {item?.ten_san_pham || ''}
                            </Link>
                          </h6>
                          <p className="featured-entry-meta">
                            ${item?.gia_ban || ''}
                          </p>
                        </div>
                        <div className="product-remove" data-title="Remove">
                          <Link
                            className="remove"
                            aria-label="Remove this item"
                            onClick={() => {
                              handleDeleteWithList(item?.id_yeu_thich);
                            }}
                          >
                            {loadingDelete ? (
                              <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                              </div>
                            ) : (
                              'X'
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithList;

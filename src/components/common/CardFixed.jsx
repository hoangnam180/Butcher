import './CardFixed.scss';
const CardFixed = ({ onClick, step }) => {
  return (
    <div
      className="card-fixed"
      onClick={() => {
        onClick();
      }}
    >
      <i className="tf-ion-android-cart"></i>
      <span className="card-fixed__number">{step || 0}</span>
    </div>
  );
};

export default CardFixed;

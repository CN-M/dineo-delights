import { useState, useEffect } from 'react';
import { urlFor } from '../../lib/Client';
import { useStateContext } from '../../context/StateContext';

const Featured = ({ product }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { deal, deadLine } = product;

  const {
    deal: {
      imgSrc, description, price, ogPrice, stars, name, slug,
    },
  } = product;

  // const deadline = 'January, 8, 2023';
  const deadline = deadLine;

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);
  const {
    decQty, incQty, qty, onAdd, setShowCart,
  } = useStateContext();

  return (
    <div className="showcase">
      <div className="showcase-banner">
        {
          imgSrc
            ? <img src={urlFor(imgSrc[0]).url()} alt={slug.current} className="showcase-img" />
            : <div />
        }

      </div>

      <div className="showcase-content">
        <div className="showcase-rating">

          { [...Array(stars)].map((e, i) => (<ion-icon key={i} name="star" />)) }
          { [...Array(5 - stars)].map((e, i) => (<ion-icon key={i} name="star-outline" />)) }

        </div>

        <a href={`/products/${slug.current}`}><h3 className="showcase-title">{name}</h3></a>

        <p className="showcase-desc">{description}</p>

        <div className="price-box">
          <p className="price">{`R${price}`}</p>

          <del>{`R${ogPrice}`}</del>
        </div>

        <div className="buy">

          <div className="product-qty">
            <button id="decrement" onClick={decQty}>
              <ion-icon name="remove-outline" />
            </button>
            <span id="quantity">{qty}</span>
            <button id="increment">
              <ion-icon name="add-outline" onClick={incQty} />
            </button>
          </div>
          <button className="add-cart-btn" onClick={() => onAdd(deal, qty)}>add to cart</button>
        </div>

        <div className="showcase-status">
          <div className="wrapper">
            <p>
              already sold: <b>3</b>
              {/* already sold: <b>20</b> */}
            </p>

            <p>
              {/* available: <b>40</b> */}
              available: <b>6</b>
            </p>
          </div>

          <div className="showcase-status-bar" />
        </div>

        <div className="countdown-box">

          <p className="countdown-desc">
            Hurry Up! Offer ends in:
          </p>

          <div className="countdown">

            <div className="countdown-content">
              {/* <p className="display-number">360</p> */}
              <p className="display-number">{days}</p>
              <p className="display-text">Days</p>

            </div>

            <div className="countdown-content">
              {/* <p className="display-number">24</p> */}
              <p className="display-number">{hours}</p>
              <p className="display-text">Hours</p>
            </div>

            <div className="countdown-content">
              {/* <p className="display-number">59</p> */}
              <p className="display-number">{minutes}</p>
              <p className="display-text">Min</p>
            </div>

            <div className="countdown-content">
              {/* <p className="display-number">00</p> */}
              <p className="display-number">{seconds}</p>
              <p className="display-text">Sec</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

import { urlFor } from '../../lib/Client';
import { useStateContext } from '../../context/StateContext';

const SingleFeature = ({ product }) => {
  const {
    decQty, incQty, qty, onAdd, setShowCart,
  } = useStateContext();

  const {
    image, description, title, price, ogPrice, stars, slug, sale, imgSrc,
  } = product;

  return (
    <div className="showcase">
      <div className="showcase-banner">
        {
         image?.length > 1
           ? <img src={urlFor(image[0]).url()} alt={slug.current} className="showcase-img" />
           : <div />
      }

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
        <a href={`/products/${slug.current}`}>
          <h3 className="showcase-title">{title}</h3>
        </a>
        <p className="showcase-desc">
          {description}
        </p>
        <div className="price-box">
          <p className="price">{`R${price}`}</p>
          { sale && ogPrice ? <del>{`R${ogPrice}`}</del> : <p /> }
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
          <button className="add-cart-btn" onClick={() => onAdd(product, qty)}>add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default SingleFeature;

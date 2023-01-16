import React, { useRef } from 'react';
import { urlFor } from '../../lib/Client';
import { useStateContext } from '../../context/StateContext';

const ProductCard = ({ product }) => {
  const cartRef = useRef();
  const {
    imgSrc, name, price, slug, _id, quantity,
  } = product;

  const {
    totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove,
  } = useStateContext();

  return (
    <div className="product-card">
      <div className="card">
        <div className="img-box">
          {
            imgSrc
              ? <img src={urlFor(imgSrc[0]).url()} alt={slug.current} width="80px" className="product-img" />
              : <div />
          }
        </div>
        <div className="detail">
          <h4 className="product-name">{name}</h4>
          <div className="wrapper">
            <div className="product-qty">
              <button id="decrement" onClick={() => toggleCartItemQuantity(_id, 'dec')}>
                <ion-icon name="remove-outline" />
              </button>
              <span id="quantity">{quantity}</span>
              <button id="increment" onClick={() => toggleCartItemQuantity(_id, 'inc')}>
                <ion-icon name="add-outline" />
              </button>
            </div>
            <div className="price">
              R <span id="price">{price}</span>
            </div>
          </div>
        </div>
        <button className="product-close-btn" onClick={() => onRemove(product)}>
          <ion-icon name="close-outline" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

/* eslint-disable no-unused-vars */
import './ShoppingCart.scss';
import { useStateContext } from '../../../context/StateContext';
import ProductCard from '../ProductCard';

const ShoppingCart = () => {
  const {
    totalPrice, cartItems, handleCart,
    isCartActive,
  } = useStateContext();

  const cartClasses = `cart-wrapper has-scrollbar ${isCartActive ? 'active' : ''}`;

  return (
    <div className={cartClasses}>
      <section className="bart-cart">
        <div className="cart-item-box">
          <div className="cart-top">
            <h2 className="cart-title">Order Summary</h2>

            <button className="menu-close-btn" onClick={handleCart}>
              <ion-icon name="close-outline" />
            </button>
          </div>
          {cartItems?.length < 1 && (
            <div className="empty-cart">
              {/* <AiOutlineShopping size={150} /> */}
              <ion-icon name="bag-handle-outline" size={150} />

              <h3>Your shopping bag is empty</h3>
              <a href="/">
                <button
                  type="button"
                  // onClick={() => setShowCart(false)}
                  onClick={handleCart}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </a>
            </div>
          )}

          {
            cartItems?.map((object, i) => (
              <ProductCard key={i} product={object} />))
          }
        </div>
        <div className="wrapper">
          <div className="discount-token">
            <div className="wrapper-flex">
              {/* <a href="/cart" className="btn btn-outline">Checkout</a> */}
              <a href="/address" className="btn btn-outline">Checkout</a>
            </div>
          </div>
          <div className="amount">
            <div className="subtotal">
              <span>Subtotal</span> <span>R <span id="subtotal">{totalPrice}</span></span>
            </div>
            {/* <div className="tax">
          <span>Tax</span> <span>R <span id="tax">0.10</span></span>
        </div> */}
            <div className="shipping">
              <span>Shipping</span> <span>R <span id="shipping">{60}</span></span>
              {/* <span>Shipping</span> <span>R <span id="shipping">0.00</span></span> */}
            </div>
            <div className="total">
              <span>Total</span> <span>R <span id="total">{totalPrice + 60}</span></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;

/* eslint-disable no-unused-vars */
import { useRef } from 'react';
import { useStateContext } from '../../context/StateContext';
import ProductCard from './ProductCard';

const Cart = ({ item }) => {
  const cartRef = useRef();

  const {
    totalPrice, cartItems, setShowCart,
  } = useStateContext();

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log('Checking pit');
  };
  return (
    <main className="cart-containerr">
      <h1 className="heading">
        <ion-icon name="cart-outline" /> Shopping Cart
      </h1>
      <div className="item-flex">
        <section className="checkout">
          <h2 className="section-heading">Payment Details</h2>
          <div className="payment-form">
            <div className="payment-method">
              <button className="method selected">
                <ion-icon name="card" />
                <span>Credit Card</span>
                <ion-icon className="checkmark fill" name="checkmark-circle" />
              </button>
              <button className="method">
                <ion-icon name="logo-paypal" />
                <span>PayPal</span>
                <ion-icon className="checkmark" name="checkmark-circle-outline" />
              </button>
            </div>
            <form action="#">
              <div className="cardholder-name">
                <label htmlFor="cardholder-name" className="label-default">Cardholder name</label>
                <input type="text" name="cardholder-name" id="cardholder-name" className="input-default" />
              </div>
              <div className="card-number">
                <label htmlFor="card-number" className="label-default">Card number</label>
                <input type="number" name="card-number" id="card-number" className="input-default" />
              </div>
              <div className="input-flex">
                <div className="expire-date">
                  <label htmlFor="expire-date" className="label-default">Expiration date</label>
                  <div className="input-flex">
                    <input
                      type="number"
                      name="day"
                      id="expire-date"
                      placeholder="31"
                      min="1"
                      max="31"
                      className="input-default"
                    />
                    <input
                      type="number"
                      name="month"
                      id="expire-date"
                      placeholder="12"
                      min="1"
                      max="12"
                      className="input-default"
                    />
                  </div>
                </div>
                <div className="cvv">
                  <label htmlFor="cvv" className="label-default">CVV</label>
                  <input type="number" name="cvv" id="cvv" className="input-default" />
                </div>
              </div>
            </form>
          </div>
          <button className="btn btn-primaryy" onClick={handleCheckout}>
            <b>Pay</b><span id="payAmount" />
          </button>
        </section>

        {/* <!--- cart section --> */}

        <section className="cart-sec">
          <div className="cart-item-boxx">
            <h2 className="section-heading">Order Summary</h2>
            {cartItems?.length < 1 && (
            <div className="empty-cart">
              {/* <AiOutlineShopping size={150} /> */}
              <ion-icon name="bag-handle-outline" size={150} />

              <h3>Your shopping bag is empty</h3>
              <a href="/">
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
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
              {/* <label
                htmlFor="discount-token"
                className="label-default"
              >Gift card/Discount code
              </label>
              <div className="wrapper-flex">
                <input
                  type="text"
                  name="discount-token"
                  id="discount-token"
                  className="input-default"
                />
                <button className="btn btn-outline">Apply</button>
              </div> */}
            </div>
            <div className="amount">
              <div className="subtotal">
                <span>Subtotal</span> <span>R <span id="subtotal">{totalPrice}</span></span>
                {/* <span>Subtotal</span> <span>R <span id="subtotal">2.05</span></span> */}
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
    </main>
  );
};
export default Cart;

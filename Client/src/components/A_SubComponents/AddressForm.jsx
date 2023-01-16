/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { useStateContext } from '../../context/StateContext';
import ProductCard from './ProductCard';

const AddressForm = ({ item }) => {
  const cartRef = useRef();

  const [delivery, setDelivery] = useState(false);
  const [pickUp, setPickUp] = useState(true);
  // const [shipping, setShipping] = useState(0);

  // const [formData, setFormData] = {
  //   RecipientName: '',
  //   RecipientPhoneNumber: '',
  //   RecipientEmailAddress: '',
  //   StreetAddress: '',
  //   ComplexOrBuilding: '',
  //   Suburb: '',
  //   CityOrTown: '',
  //   Province: '',
  //   PostalCode: '',
  // }

  let shipping = 0;
  const {
    totalPrice, cartItems, setShowCart,
  } = useStateContext();

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log('Checking pit');
  };

  const handleSelected = () => {
    setDelivery((current) => !current);
    setPickUp((current) => !current);
  };

  // const handleForm = async (e) => {
  //   const { name, value } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   })
  // }

  const deliveryClasses = `method ${delivery ? 'selected' : ''} `;
  const pickUpClasses = `method ${pickUp ? 'selected' : ''} `;
  if (delivery) {
    shipping = 100;
  }

  return (
    <main className="cart-containerr">
      <h1 className="heading">
        <ion-icon name="cart-outline" /> Shopping Cart
      </h1>
      <div className="item-flex">
        <section className="checkout">
          {
            delivery
              ? <h2 className="section-heading">Delivery Details</h2>
              : <div />
          }
          {
            pickUp
              // ? <h2 className="section-heading">Pickup Details</h2>
              ? <h2 className="section-heading">Pickup Details - Turf Only</h2>
              : <div />
          }
          <div className="payment-form">
            <div className="payment-method">
              {/* <button onClick={handleSelected} className="method selected"> */}
              <button onClick={handleSelected} className={deliveryClasses}>
                <ion-icon name="card" />
                <span>Delivery</span>
                <ion-icon className="checkmark fill" name="checkmark-circle" />
              </button>

              {/* <button onClick={handleSelected} className="method selected"> */}
              <button onClick={handleSelected} className={pickUpClasses}>
                <ion-icon name="card" />
                <span>Pick Up</span>
                <ion-icon className="checkmark fill" name="checkmark-circle" />
              </button>
              {/* <button onClick={handleSelected} className="method">
                <ion-icon name="logo-paypal" />
                <span>PayPal</span>
                <ion-icon className="checkmark" name="checkmark-circle-outline" />
              </button> */}
            </div>

            {
            delivery
              ? (
                <form action="#">
                  <div className="cardholder-name">
                    <label htmlFor="cardholder-name" className="label-default">Recipient Name</label>
                    <input type="text" name="cardholder-name" id="cardholder-name" className="input-default" />
                  </div>
                  <div className="input-flex top-g">
                    <div className="phone-number">
                      <label htmlFor="phone-number" className="label-default">Recipient Phone Number</label>
                      <input type="number" name="phone-number" id="phone-number" className="input-default" />
                    </div>
                    <div className="phone-number">
                      <label htmlFor="email-address" className="label-default">Recipient Email Address</label>
                      <input type="text" name="email-address" id="email-address" className="input-default" />
                    </div>
                  </div>
                  <div className="cardholder-name">
                    <label htmlFor="cardholder-name" className="label-default">Street Address</label>
                    <input type="text" name="cardholder-name" id="cardholder-name" className="input-default" />
                  </div>
                  <div className="cardholder-name">
                    <label htmlFor="cardholder-name" className="label-default">Complex / Building (Optional)</label>
                    <input type="text" name="cardholder-name" id="cardholder-name" className="input-default" />
                  </div>
                  <div className="cardholder-name">
                    <label htmlFor="cardholder-name" className="label-default">Suburb</label>
                    <input type="text" name="cardholder-name" id="cardholder-name" className="input-default" />
                  </div>
                  <div className="cardholder-name">
                    <label htmlFor="cardholder-name" className="label-default">City / Town</label>
                    <input type="text" name="cardholder-name" id="cardholder-name" className="input-default" />
                  </div>
                  <div className="input-flex">
                    <div className="expire-date">
                      <label htmlFor="province" className="label-default">Province</label>
                      <div className="input-flex">
                        <select className="input-default" id="input-default" name="cars">
                          <option value="">--Please choose a Province--</option>
                          <option value="volvo">Limpopo</option>
                          <option value="saab">Gauteng</option>
                          <option value="fiat">Free State</option>
                          <option value="audi">Western Cape</option>
                          <option value="audi">Eastern Cape</option>
                          <option value="audi">Northern Cape</option>
                          <option value="audi">KwaZulu-Natal</option>
                          <option value="audi">Mpumalanga</option>
                        </select>
                      </div>
                    </div>
                    <div className="cvv">
                      <label htmlFor="cvv" className="label-default">Postal Code</label>
                      <input type="number" name="cvv" id="cvv" className="input-default" />
                    </div>
                  </div>
                </form>
              )
              : <div />
            }
            {
            pickUp
              ? (
                <form action="#">
                  <div className="cardholder-name">
                    <label htmlFor="cardholder-name" className="label-default">Recipient Name</label>
                    <input type="text" name="cardholder-name" id="cardholder-name" className="input-default" />
                  </div>
                  <div className="input-flex">
                    <div className="phone-number">
                      <label htmlFor="phone-number" className="label-default">Recipient Phone Number</label>
                      <input type="number" name="phone-number" id="phone-number" className="input-default" />
                    </div>
                    <div className="phone-number">
                      <label htmlFor="email-address" className="label-default">Recipient Email Address</label>
                      <input type="text" name="email-address" id="email-address" className="input-default" />
                    </div>
                  </div>
                </form>
              )
              : <div />
            }
          </div>
          <a href="/cart" className="btn btn-primaryy">
            <b>Continue</b>
          </a>
        </section>
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
            </div>
            <div className="amount">
              <div className="subtotal">
                <span>Subtotal</span> <span>R <span id="subtotal">{totalPrice}</span></span>
              </div>
              <div className="shipping">
                <span>Shipping</span> <span>R <span id="shipping">{shipping}</span></span>
              </div>
              <div className="total">
                <span>Total</span> <span>R <span id="total">{totalPrice + shipping}</span></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default AddressForm;

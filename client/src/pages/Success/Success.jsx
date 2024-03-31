import './Success.scss';
import React, { useState, useEffect } from 'react';

import { useStateContext } from '../../context/StateContext';
import { runFireworks } from '../../lib/Utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <ion-icon name="bag-handle-outline" />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <a href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </a>
      </div>
    </div>
  );
};

export default Success;

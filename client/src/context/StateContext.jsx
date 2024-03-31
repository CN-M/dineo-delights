/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const getLocalStorage = (name) => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(name);
      if (storage) return JSON.parse(localStorage.getItem(name));
      if (name === 'cartItems') return [];
      return 0;
    }
  };

  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [isCartActive, setIsCartActive] = useState(false);
  const [cartItems, setCartItems] = useState(getLocalStorage('cartItems'));
  const [totalPrice, setTotalPrice] = useState(getLocalStorage('totalPrice'));
  const [totalQuantities, setTotalQuantities] = useState(getLocalStorage('totalQuantities'));
  const [qty, setQty] = useState(1);

  let findProduct;
  let index;

  const handleOverlay = () => {
    setIsOverlayActive((current) => !current);
  };

  const handleCart = () => {
    // setShowCart((current) => !current);
    setIsCartActive((current) => !current);
    handleOverlay();
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
  }, [cartItems, totalPrice, totalQuantities]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (cartProduct) => cartProduct._id === product._id,
    );

    handleCart();

    if (checkProductInCart) {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
      // toast.success(`${qty} ${product.name} added`);
      toast.success(`${quantity} ${product.name} added`);
    } else {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);
      // eslint-disable-next-line no-param-reassign
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      // toast.success(`${qty} ${product.name} added`);
      toast.success(`${quantity} ${product.name} added`);
    }
  };

  const onRemove = (product) => {
    findProduct = cartItems.find((item) => item._id === product._id);
    const tempCart = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(totalPrice - findProduct.price * findProduct.quantity);
    setTotalQuantities(totalQuantities - findProduct.quantity);
    setCartItems(tempCart);
  };

  const toggleCartItemQuantity = (id, value) => {
    findProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === 'inc') {
      findProduct.quantity += 1;
      cartItems[index] = findProduct;
      setTotalPrice(totalPrice + findProduct.price);
      setTotalQuantities(totalQuantities + 1);
    }

    if (value === 'dec') {
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
        cartItems[index] = findProduct;
        setTotalPrice(totalPrice - findProduct.price);
        setTotalQuantities(totalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((oldQty) => {
      const tempQty = oldQty + 1;
      return tempQty;
    });
  };

  const handleMobileSidebar = () => {
    setIsSideBarActive((current) => !current);
    handleOverlay();
  };

  const handleMobileMenu = () => {
    setIsMobileActive((current) => !current);
    handleOverlay();
  };

  const decQty = () => {
    setQty((oldQty) => {
      let tempQty = oldQty - 1;
      if (tempQty < 1) {
        tempQty = 1;
      }
      return tempQty;
    });
  };

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        onAdd,
        onRemove,
        cartItems,
        totalPrice,
        totalQuantities,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        showCart,
        incQty,
        decQty,
        qty,
        toggleCartItemQuantity,
        isOverlayActive,
        handleOverlay,
        isLoading,
        setIsLoading,
        handleMobileSidebar,
        isSideBarActive,
        isMobileActive,
        handleMobileMenu,
        handleCart,
        isCartActive,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

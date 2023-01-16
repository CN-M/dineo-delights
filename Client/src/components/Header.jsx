/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';
import logo from '../assets/images/logo/vite.svg';

import PanelListItem from './A_SubComponents/PanelListItem';
import DropDownItem from './A_SubComponents/DropDownItem';
import SubMenuCategory from './A_SubComponents/SubMenuCategory';
// import Cart from './A_SubComponents/Cart/Cart';

import { client, urlFor } from '../lib/Client';
import ShoppingCart from './A_SubComponents/ShoppingCart/ShoppingCart';

const Header = () => {
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [electronicsData, setElectronicsData] = useState([]);
  const [clothingData, setClothingData] = useState([]);
  const [footwearData, setFootwearData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const QUERY = '*[_type == "category"]';
      const categoryData = await client.fetch(QUERY);

      const accessories = ['glasses-and-lens', 'hat-and-caps', 'fragrances'];
      const accData = [];

      const electronics = ['watch'];
      const eleData = [];

      const clothing = ['shirts', 'winter-wear', 'jacket', 'shorts-and-jeans', 'dress-and-frock'];
      const clothData = [];

      const footwear = ['shoes'];
      const footData = [];

      for (let i = 0; i < categoryData.length; i++) {
        const testSubject = categoryData[i].categorySlug.current;
        if (accessories.includes(testSubject)) {
          accData.push(categoryData[i]);
        }
        if (electronics.includes(testSubject)) {
          eleData.push(categoryData[i]);
        }
        if (clothing.includes(testSubject)) {
          clothData.push(categoryData[i]);
        }
        if (footwear.includes(testSubject)) {
          footData.push(categoryData[i]);
        }
      }

      setAccessoriesData(accData);
      setElectronicsData(eleData);
      setClothingData(clothData);
      setFootwearData(footData);
    };

    getData();
  }, []);

  const {
    decQty, incQty, qty, onAdd, setShowCart,
    showCart, totalQuantities,
    handleMobileSidebar, handleMobileMenu,
    handleCart, isCartActive,
    isMobileActive,

  } = useStateContext();

  const news = true;

  const mobileActive = isMobileActive ? 'active' : '';
  const mobileClasses = `mobile-navigation-menu has-scrollbar ${mobileActive}`;

  // const cartActive = isCartActive ? 'active' : '';
  // const cartClasses = `mobile-navigation-menu has-scrollbar ${cartActive}`;

  const handleAccordian = (e) => {
    const sibling = e.target.nextElementSibling.classList;
    const current = e.target.classList;
    sibling.toggle('active');
    current.toggle('active');
  };

  return (
    <header>
      <div className="header-top">
        <div className="container">
          <ul className="header-social-container">
            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-facebook" />
              </a>
            </li>

            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-twitter" />
              </a>
            </li>

            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-instagram" />
              </a>
            </li>

            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-linkedin" />
              </a>
            </li>
          </ul>

          {
            news
              ? (
                <div className="header-alert-news">
                  <p>
                    <b>Free Shipping</b> For Orders Over - R1000
                  </p>
                </div>
              )
              : <div />
          }

          <div className="random" />
        </div>

      </div>

      <div className="header-main">
        <div className="container">
          <a href="/" className="header-logo">
            <img src={logo} alt="Anon's logo" width="120" height="36" />
          </a>

          {/* <div className="header-search-container">
            <input type="search" name="search" className="search-field"
            placeholder="Enter your product name..." />
            <button className="search-btn">
              <ion-icon name="search-outline" />
            </button>
          </div> */}

          <div className="header-user-actions">
            {/* <button className="action-btn">
              <ion-icon name="person-outline" />
            </button> */}

            {/* <button className="action-btn">
              <ion-icon name="heart-outline" />
              <span className="count">0</span>
            </button> */}

            <a className="action-btn" href="/address">
            {/* <a className="action-btn" href="/cart"> */}
              <ion-icon name="bag-handle-outline" />
              <span className="count">{totalQuantities}</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="desktop-navigation-menu">
        <div className="container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category">
              <a href="/" className="menu-title">Home</a>
            </li>
            <li className="menu-category">
              {/* <a href="/" className="menu-title">Categories</a> */}
              <span className="menu-title point-class">Categories</span>
              <div className="dropdown-panel">
                <ul className="dropdown-panel-list">
                  <li className="menu-title">
                    <span className="point-class">Electronics</span>
                  </li>

                  {
                    electronicsData.map((object, i) => (
                      <PanelListItem key={i} category={object} />
                    ))
                  }

                  <li />

                </ul>

                <ul className="dropdown-panel-list">

                  <li className="menu-title">
                    <span className="point-class">Clothing</span>
                  </li>

                  {
                    clothingData.map((object, i) => (
                      <PanelListItem key={i} category={object} />
                    ))
                  }

                  <li />
                </ul>

                <ul className="dropdown-panel-list">

                  <li className="menu-title">
                    <span className="point-class">Accesories</span>
                  </li>

                  {
                    accessoriesData.map((object, i) => (
                      <PanelListItem key={i} category={object} />
                    ))
                  }

                  <li />
                </ul>

                <ul className="dropdown-panel-list">

                  <li className="menu-title">
                    <span className="point-class">Footwear</span>
                  </li>
                  {
                    footwearData.map((object, i) => (
                      <PanelListItem key={i} category={object} />
                    ))
                  }
                  <li />

                </ul>

              </div>
            </li>

            <li className="menu-category">
              <span className="menu-title point-class">Clothing</span>
              <ul className="dropdown-list">

                {
                    clothingData.map((object, i) => (
                      <DropDownItem key={i} category={object} />
                    ))
                  }

              </ul>
            </li>

            <li className="menu-category">
              <span className="menu-title point-class">Accesories</span>

              <ul className="dropdown-list">

                {
                    accessoriesData.map((object, i) => (
                      <DropDownItem key={i} category={object} />
                    ))
                  }

              </ul>
            </li>

            {/* <li className="menu-category">
              <a href="/" className="menu-title">Hot Offers</a>
            </li> */}

          </ul>
        </div>
      </nav>

      <div className="mobile-bottom-navigation">

        <button className="action-btn" onClick={handleMobileMenu} data-mobile-menu-open-btn>
          <ion-icon name="menu-outline" />
        </button>

        {/* <a href="/cart" className="action-btn"> */}
        <button onClick={handleCart} className="action-btn">
          <ion-icon name="bag-handle-outline" />
          <span className="count">{totalQuantities}</span>
        </button>

        <a href="/" className="action-btn">
          <ion-icon name="home-outline" />
        </a>

        {/* <button className="action-btn">
          <ion-icon name="heart-outline" />
          <span className="count">0</span>
        </button> */}

        <button className="action-btn" onClick={handleMobileSidebar} data-mobile-menu-open-btn>
          <ion-icon name="grid-outline" />
        </button>

      </div>

      <nav className={mobileClasses} data-mobile-menu>

        <div className="menu-top">
          <h2 className="menu-title">Menu</h2>

          <button className="menu-close-btn" onClick={handleMobileMenu} data-mobile-menu-close-btn>
            <ion-icon name="close-outline" />
          </button>
        </div>

        <ul className="mobile-menu-category-list">

          <li className="menu-category">
            <a href="/" className="menu-title">Home</a>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" onClick={handleAccordian} data-accordion-btn>
              <p className="menu-title">Clothing</p>
              <div>
                <ion-icon name="add-outline" className="add-icon" />
                {/* <ion-icon name="remove-outline" className="remove-icon" /> */}
              </div>
            </button>
            <ul className="submenu-category-list" data-accordion>
              {
                clothingData?.map((object, i) => (
                  <SubMenuCategory key={i} category={object} />
                ))
              }

            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" onClick={handleAccordian} data-accordion-btn>
              <p className="menu-title">Accesories</p>
              <div>
                <ion-icon name="add-outline" className="add-icon" />
                {/* <ion-icon name="remove-outline" className="remove-icon" /> */}
              </div>
            </button>
            <ul className="submenu-category-list" data-accordion>
              {
                accessoriesData?.map((object, i) => (
                  <SubMenuCategory key={i} category={object} />
                ))
              }

            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" onClick={handleAccordian} data-accordion-btn>
              <p className="menu-title">Electronics</p>
              <div>
                <ion-icon name="add-outline" className="add-icon" />
                {/* <ion-icon name="remove-outline" className="remove-icon" /> */}
              </div>
            </button>
            <ul className="submenu-category-list" data-accordion>
              {
                electronicsData?.map((object, i) => (
                  <SubMenuCategory key={i} category={object} />
                ))
              }

            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" onClick={handleAccordian} data-accordion-btn>
              <p className="menu-title">Footwear</p>
              <div>
                <ion-icon name="add-outline" className="add-icon" />
                {/* <ion-icon name="remove-outline" className="remove-icon" /> */}
              </div>
            </button>
            <ul className="submenu-category-list" data-accordion>
              {
                footwearData?.map((object, i) => (
                  <SubMenuCategory key={i} category={object} />
                ))
              }

            </ul>
          </li>

          {/* <li className="menu-category">
            <a href="/" className="menu-title">Hot Offers</a>
          </li> */}

        </ul>
        <div className="menu-bottom">
          <ul className="menu-category-list" />
          <ul className="menu-social-container">
            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-facebook" />
              </a>
            </li>
            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-twitter" />
              </a>
            </li>
            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-instagram" />
              </a>
            </li>
            <li>
              <a href="/" className="social-link">
                <ion-icon name="logo-linkedin" />
              </a>
            </li>
          </ul>
        </div>
        {showCart && <ShoppingCart />}
        {/* {showCart && <Cart />} */}
      </nav>
    </header>
  );
};

export default Header;

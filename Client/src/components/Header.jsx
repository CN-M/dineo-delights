import { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';
import logo from '../assets/images/logo/vite.svg';
// import logo from '../assets/images/logo/Dineo-delights-logo.jpeg';

import PanelListItem from './A_SubComponents/PanelListItem';
import DropDownItem from './A_SubComponents/DropDownItem';
import SubMenuCategory from './A_SubComponents/SubMenuCategory';

import { client } from '../lib/Client';
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
      const electronics = ['watch'];
      const clothing = ['shirts', 'winter-wear', 'jacket', 'shorts-and-jeans', 'dress-and-frock'];
      const footwear = ['shoes'];
      const accData = categoryData.filter((data) => accessories.includes(data.categorySlug.current));
      const eleData = categoryData.filter((data) => electronics.includes(data.categorySlug.current));
      const clothData = categoryData.filter((data) => clothing.includes(data.categorySlug.current));
      const footData = categoryData.filter((data) => footwear.includes(data.categorySlug.current));
      setAccessoriesData(accData);
      setElectronicsData(eleData);
      setClothingData(clothData);
      setFootwearData(footData);
    };
    getData();
  }, []);

  const {
    showCart, totalQuantities,
    handleMobileSidebar, handleMobileMenu,
    handleCart,
    isMobileActive,

  } = useStateContext();

  const news = true;

  const mobileActive = isMobileActive ? 'active' : '';
  const mobileClasses = `mobile-navigation-menu has-scrollbar ${mobileActive}`;

  // const handleAccordian = (e) => {
  //   const sibling = e.target.nextElementSibling.classList;
  //   const current = e.target.classList;
  //   sibling.toggle('active');
  //   current.toggle('active');
  // };

  const [accordianActive1, setAccordian1Active] = useState(false)
  const [accordianActive2, setAccordian2Active] = useState(false)
  const [accordianActive3, setAccordian3Active] = useState(false)
  const [accordianActive4, setAccordian4Active] = useState(false)

  const accordianClasses1 = `${accordianActive1 ? 'active' : ''}`
  const accordianClasses2 = `${accordianActive2 ? 'active' : ''}`
  const accordianClasses3 = `${accordianActive3 ? 'active' : ''}`
  const accordianClasses4 = `${accordianActive4 ? 'active' : ''}`
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
            <button className={`accordion-menu ${accordianClasses1}`} id='1' onClick={() => setAccordian1Active((current) => !current)} data-accordion-btn>
            {/* <button className="accordion-menu" data-accordion-btn> */}
              <p className="menu-title">Clothing</p>
              <div>
                {
                  accordianClasses1 !== 'active'
                  ? <ion-icon name="add-outline" className="add-icon" />
                  :<ion-icon name="remove-outline" className="remove-icon" />
                }
              </div>
            </button>
            <ul className={`submenu-category-list ${accordianClasses1}`} id='1' data-accordion>
              {
                clothingData?.map((object, i) => (
                  <SubMenuCategory key={i} category={object} />
                ))
              }

            </ul>
          </li>

          <li className="menu-category">
            <button className={`accordion-menu ${accordianClasses2}`} id='2' onClick={() => setAccordian2Active((current) => !current)} data-accordion-btn>
            {/* <button className="accordion-menu" data-accordion-btn> */}
              <p className="menu-title">Accesories</p>
              <div>
                {
                  accordianClasses2 !== 'active'
                  ? <ion-icon name="add-outline" className="add-icon" />
                  :<ion-icon name="remove-outline" className="remove-icon" />
                }
              </div>
            </button>
            <ul className={`submenu-category-list ${accordianClasses2}`} id='2' data-accordion>
              {
                accessoriesData?.map((object, i) => (
                  <SubMenuCategory key={i} category={object} />
                ))
              }

            </ul>
          </li>

          <li className="menu-category">
            <button className={`accordion-menu ${accordianClasses3}`} id='3' onClick={() => setAccordian3Active((current) => !current)} data-accordion-btn>
            {/* <button className="accordion-menu" data-accordion-btn> */}
              <p className="menu-title">Electronics</p>
              <div>
                {
                  accordianClasses3 !== 'active'
                  ? <ion-icon name="add-outline" className="add-icon" />
                  :<ion-icon name="remove-outline" className="remove-icon" />
                }
              </div>
            </button>
            <ul className={`submenu-category-list ${accordianClasses3}`} id='3' data-accordion>
              {
                electronicsData?.map((object, i) => (
                  <SubMenuCategory key={i} category={object} />
                ))
              }

            </ul>
          </li>

          <li className="menu-category">
            <button className={`accordion-menu ${accordianClasses4}`} id='4' onClick={() => setAccordian4Active((current) => !current)} data-accordion-btn>
            {/* <button className="accordion-menu" data-accordion-btn> */}
              <p className="menu-title">Footwear</p>
              <div>
                {
                  accordianClasses4 !== 'active'
                  ? <ion-icon name="add-outline" className="add-icon" />
                  :<ion-icon name="remove-outline" className="remove-icon" />
                }
              </div>
            </button>
            <ul className={`submenu-category-list ${accordianClasses4}`} id='4' data-accordion>
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

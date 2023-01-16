import './Home.scss';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Sidebar from '../../components/Sidebar';
import ProductMinimal from '../../components/ProductMinimal';
import ProductFeatured from '../../components/ProductFeatured';
import ProductGrid from '../../components/ProductGrid';
import Testimonial from '../../components/Testimonial';
import CTA from '../../components/CTA';
import Service from '../../components/Service';
import Footer from '../../components/Footer';
import ShoppingCart from '../../components/A_SubComponents/ShoppingCart/ShoppingCart';

import { client } from '../../lib/Client';

const Home = () => {
  const [productData, setProductData] = useState([]);

  console.log('Yes');

  const { isOverlayActive, showCart } = useStateContext();

  useEffect(() => {
    const QUERY = `*[_type == "product"] {
      ...,
      category[]->
    }`;

    const getData = async () => {
      const response = await client.fetch(QUERY);
      setProductData(response);
    };

    getData();
  }, []);

  const overlayActive = isOverlayActive ? 'active' : '';
  const overlayClasses = `overlay ${overlayActive}`;

  return (
    <>
      <div className={overlayClasses} data-overlay />
      {/* { showCart && <ShoppingCart /> } */}
      <ShoppingCart />
      {/* <Header SidebarHandler={handleMobileSidebar} /> */}
      <Header />
      <main>
        <Banner />
        <Category />
        <div className="product-container">
          <div className="container">
            <Sidebar />
            {/* <Sidebar SidebarHandler={handleMobileSidebar} /> */}
            {/* <Sidebar sideBarClasses={sideBarClasses} SidebarHandler={handleMobileSidebar} /> */}
            <div className="product-box">
              <ProductMinimal productData={productData} />
              <ProductFeatured />
              <ProductGrid heading="Products" productData={productData} />
            </div>

          </div>
        </div>
        <div>
          <div className="container">
            <div className="testimonials-box">
              <Testimonial />
              <CTA />
              <Service />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;

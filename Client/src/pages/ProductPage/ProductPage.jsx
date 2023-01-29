/* eslint-disable no-unused-vars */
import './Product.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';
import { client } from '../../lib/Client';
import Header from '../../components/Header';
import Category from '../../components/Category';
import Sidebar from '../../components/Sidebar';
import SingleProduct from '../../components/SingleProduct';
import ProductGrid from '../../components/ProductGrid';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import ShoppingCart from '../../components/A_SubComponents/ShoppingCart/ShoppingCart';

const ProductPage = () => {
  // const path = window.location.pathname.split('/')[2];
  const { slug } = useParams();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const { isLoading, setIsLoading } = useStateContext();

  useEffect(() => {
    const getData = async () => {
      const QUERY = `*[_type == "product" && slug.current == "${slug}"] {
        ...,
        category[]->
      }`;
      const response = await client.fetch(QUERY);
      setProductData(response);
      setIsLoading(false);
    };

    const getProductData = async () => {
      const QUERY = `*[_type == "product"] {
      ...,
      category[]-> {
              categoryName,
              categorySlug
      },
    }
    `;

      const response = await client.fetch(QUERY);
      setCategoryData(response);
    };

    getData();
    getProductData();
  }, []);

  const {
    isOverlayActive, isSideBarActive, handleMobileSidebar, handleMobileMenu,
  } = useStateContext();

  const overlayActive = isOverlayActive ? 'active' : '';
  const overlayClasses = `overlay ${overlayActive}`;

  const mobileActive = isSideBarActive ? 'active' : '';
  const sideBarClasses = `sidebar has-scrollbar ${mobileActive}`;

  return (
    <>
      <div className={overlayClasses} data-overlay />
      <ShoppingCart />
      <Header />
      <main>
        <Category />
        <div className="product-container">
          <div className="container">
            <Sidebar sideBarClasses={sideBarClasses} SidebarHandler={handleMobileSidebar} />
            <div className="product-box">
              {
                isLoading
                  ? <Loading />
                  : (
                    <>
                      <SingleProduct product={productData} />
                      <ProductGrid heading="Recommended Products" productData={categoryData.slice(4, 8)} />
                    </>
                  )
              }
            </div>
          </div>
        </div>
        <div />
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;

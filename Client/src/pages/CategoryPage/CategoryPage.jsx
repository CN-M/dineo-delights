/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../lib/Client';
import { useStateContext } from '../../context/StateContext';
import Header from '../../components/Header';
import Category from '../../components/Category';
import Sidebar from '../../components/Sidebar';
import ProductGrid from '../../components/ProductGrid';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

const CategoryPage = () => {
  // const path = window.location.pathname.split('/')[2];
  const { slug } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  const {
    isLoading, setIsLoading, isOverlayActive,
    isSideBarActive, handleMobileSidebar,
  } = useStateContext();

  useEffect(() => {
    const QUERY = `*[count((category[]->categorySlug.current)[@ in ["${slug}"]]) > 0] {
      ...,
      category[]-> {
        categoryName,
        categorySlug
      }
    }`;

    const getData = async () => {
      const response = await client.fetch(QUERY);
      setCategoryData(response);
      console.log(response[0].category[0])
      setIsLoading(false);
    };

    getData();
  }, []);

  const overlayActive = isOverlayActive ? 'active' : '';
  const overlayClasses = `overlay ${overlayActive}`;

  const mobileActive = isSideBarActive ? 'active' : '';
  const sideBarClasses = `sidebar has-scrollbar ${mobileActive}`;

  return (
    <>
      <div className={overlayClasses} data-overlay />
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
                    <ProductGrid heading={`${slug}`} productData={categoryData}/>
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

export default CategoryPage;

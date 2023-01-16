/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { client } from '../../lib/Client';
import { useStateContext } from '../../context/StateContext';
import Header from '../../components/Header';
import Category from '../../components/Category';
import Sidebar from '../../components/Sidebar';
import ProductGrid from '../../components/ProductGrid';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';

const CategoryPage = () => {
  const path = window.location.pathname.split('/')[2];
  const [categoryData, setCategoryData] = useState([]);

  console.log(path);
  console.log('path');

  const {
    isLoading, setIsLoading, isOverlayActive,
    isSideBarActive, handleMobileSidebar,
  } = useStateContext();

  useEffect(() => {
    // const QUERY = `*[_type == "product" && category->categorySlug.current == "${path}"] {
    // const QUERY = `*[_type == "category" &&
    // const QUERY = `*[_type == "product" && category[]->categorySlug.current)[@ in ["${path}"]]]
    // const QUERY = `*[category[]->categorySlug.current[@ in ["${path}"]]]`;
    const QUERY = `*[count((category[]->categorySlug.current)[@ in ["${path}"]]) > 0] {
      ...,
      category[]-> {
        categoryName,
        categorySlug
      }
    }`;
    // const QUERY = `*[_type == "product" && category->categorySlug.current == "${path}"] {
    //   ...,
    //   category[]-> {
    //     categoryName,
    //       categorySlug
    //   },
    // }
    // `;

    const getData = async () => {
      const response = await client.fetch(QUERY);
      setCategoryData(response);
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
                    <ProductGrid
                      heading={`${path}`}
                      productData={categoryData}
                    />
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

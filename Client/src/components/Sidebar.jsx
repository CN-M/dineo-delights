import { useEffect, useState } from 'react';
import { useStateContext } from '../context/StateContext';
import SideBarCategory from './A_SubComponents/SideBarCategory';
import SideBarProduct from './A_SubComponents/SideBarProduct';

import { client } from '../lib/Client';

const Sidebar = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  const { isSideBarActive, handleMobileSidebar } = useStateContext();

  useEffect(() => {
    const getCategoryData = async () => {
      const QUERY = '*[_type == "category"]';
      const response = await client.fetch(QUERY);
      setCategoryData(response);
    };

    const getProductData = async () => {
      const QUERY = '*[_type == "product" && sale == true ]';
      const response = await client.fetch(QUERY);
      setProductData(response);
    };

    getCategoryData();
    getProductData();
  }, []);

  const sidebarActive = isSideBarActive ? 'active' : '';
  const sideBarClasses = `sidebar has-scrollbar ${sidebarActive}`;

  const handleAccordian = (e) => {
    e.target.nextElementSibling.classList.toggle('active');
    e.target.classList.toggle('active');
  };

  return (
    <div className={sideBarClasses} data-mobile-menu>
      <div className="sidebar-category">
        <div className="sidebar-top">
          <h2 className="sidebar-title">Categories</h2>
          {/* <button className="sidebar-close-btn" onClick={SidebarHandler}
          data-mobile-menu-close-btn> */}
          <button className="sidebar-close-btn" onClick={handleMobileSidebar} data-mobile-menu-close-btn>
            <ion-icon name="close-outline" />
          </button>
        </div>
        <ul className="sidebar-menu-category-list">
          {
            categoryData?.map((object, i) => (
              <SideBarCategory key={i} category={object} handleAccordian={handleAccordian} />
            ))
          }
        </ul>
      </div>
      <div className="product-showcase">
        <h3 className="showcase-heading">best Deals</h3>
        <div className="showcase-wrapper">
          <div className="showcase-container">
            {
              productData.slice(3, 7)?.map((object, i) => (
                <SideBarProduct key={i} product={object} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

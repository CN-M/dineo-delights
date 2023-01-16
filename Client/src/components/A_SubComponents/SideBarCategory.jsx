import SidebarSubCategory from './SidebarSubCategory';
import { urlFor } from '../../lib/Client';

const SideBarCategory = ({
  category: {
    imgSrc, categoryName, categorySlug,
  }, handleAccordian,
}) => (
  <li className="sidebar-menu-category">
    {/* <button className="sidebar-accordion-menu" onClick={handleAccordian} data-accordion-btn> */}
    <button className="sidebar-accordion-menu" data-accordion-btn>
      <div className="menu-title-flex">
        <img src={urlFor(imgSrc).url()} alt={categorySlug.current} className="menu-title-img" width="20" height="20" />
        {/* <p className="menu-title">{categoryName}</p> */}
        <a href={`/categories/${categorySlug.current}`} className="menu-title">{categoryName}</a>
      </div>
      <div>
        {/* <ion-icon name="add-outline" className="add-icon" /> */}
        {/* <ion-icon name="remove-outline" className="remove-icon" /> */}
      </div>
    </button>
    <ul className="sidebar-submenu-category-list" data-accordion>
      {/* {
          items?.map((object, i) => (
            <SidebarSubCategory key={i} item={object} />
          ))
        } */}
    </ul>
  </li>
);

export default SideBarCategory;

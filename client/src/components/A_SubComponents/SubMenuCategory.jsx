const SubMenuCategory = ({ category: { categoryName, categorySlug } }) => (
  <li className="submenu-category">
    <a href={`/categories/${categorySlug.current}`} className="submenu-title">{categoryName}</a>
  </li>
);

export default SubMenuCategory;

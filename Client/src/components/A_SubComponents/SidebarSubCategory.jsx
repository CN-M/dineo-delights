const SidebarSubCategory = ({ item: { productName, stock, link } }) => (
  <li className="sidebar-submenu-category">
    <a href={link} className="sidebar-submenu-title">
      <p className="product-name">{productName}</p>
      <data value={stock} className="stock" title="Available Stock">{stock}</data>
    </a>
  </li>
);

export default SidebarSubCategory;

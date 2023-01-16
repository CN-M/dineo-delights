const DropDownItem = ({ category: { categoryName, categorySlug } }) => (
  <li className="dropdown-item">
    <a href={`/categories/${categorySlug.current}`}>{categoryName}</a>
  </li>
);

export default DropDownItem;

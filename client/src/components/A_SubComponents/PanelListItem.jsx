const PanelListItem = ({ category: { categoryName, categorySlug } }) => (
  <li className="panel-list-item">
    <a href={`/categories/${categorySlug.current}`}>{categoryName}</a>
  </li>
);

export default PanelListItem;

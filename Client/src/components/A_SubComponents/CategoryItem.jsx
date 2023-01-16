import { urlFor } from '../../lib/Client';

const CategoryItem = ({
  category: {
    imgSrc, categoryName, categorySlug,
  },
}) => (
  <div className="category-item">
    <div className="category-img-box">
      <img src={urlFor(imgSrc).url()} alt={categorySlug.current} width="30" />
    </div>
    <div className="category-content-box">
      <div className="category-content-flex">
        <h3 className="category-item-title">{categoryName}</h3>
        <p className="category-item-amount" />
      </div>
      <a href={`/categories/${categorySlug.current}`} className="category-btn">Show all</a>
    </div>
  </div>
);

export default CategoryItem;

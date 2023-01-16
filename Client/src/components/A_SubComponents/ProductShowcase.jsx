import { urlFor } from '../../lib/Client';

const ProductShowcase = ({
  product: {
    name, price, ogPrice, slug, sale, imgSrc, category,
  },
}) => (
  <div className="showcase">
    <div>
      <a href={`/products/${slug.current}`} className="showcase-img-box">
        {
          imgSrc
            ? <img src={urlFor(imgSrc[0]).url()} alt={slug.current} width="70" className="showcase-img" />
            : <div />
        }
      </a>
    </div>
    <div className="showcase-content">
      <a href={`/products/${slug.current}`}><h4 className="showcase-title">{name}</h4></a>
      <span className="span-clan">
        {
        Array.isArray(category)
          ? category.map((object, i) => (
            <a href={`/categories/${object.categorySlug.current}`} key={i} className="showcase-category">{object.categoryName}</a>
          ))
          : <a href={`/categories/${category.categorySlug.current}`} className="showcase-category">{category.categoryName}</a>
        }
      </span>

      <div className="price-box">
        <p className="price">{`R${price}`}</p>

        { sale && ogPrice ? <del>{`R${ogPrice}`}</del> : <p /> }

      </div>
    </div>
  </div>
);

export default ProductShowcase;

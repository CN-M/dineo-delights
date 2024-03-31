import { urlFor } from '../../lib/Client';

const ProductShowcase = ({
  product: {
    name, price, ogPrice, slug, sale, imgSrc, category,
  },
}) => (
  <a href={`/products/${slug.current}`} className="showcase">
    <div>
      <div  className="showcase-img-box">
        {
          imgSrc
            ? <img src={urlFor(imgSrc[0]).url()} alt={slug.current} width="70" className="showcase-img" />
            : <div />
        }
      </div>
    </div>
    <div className="showcase-content">
      <div>
        <h4 className="showcase-title">{name}</h4>
      </div>
      <span className="span-clan">
        {
          Array.isArray(category)
            ? category.map((object, i) => (
              <div href={`/categories/${object.categorySlug.current}`} key={i} className="showcase-category">{object.categoryName}</div>
            ))
            : <div href={`/categories/${category.categorySlug.current}`} className="showcase-category">{category.categoryName}</div>
        }
      </span>
      <div className="price-box">
        <p className="price">{`R${price}`}</p>

        { sale && ogPrice ? <del>{`R${ogPrice}`}</del> : <p /> }

      </div>
    </div>
  </a>
);

export default ProductShowcase;

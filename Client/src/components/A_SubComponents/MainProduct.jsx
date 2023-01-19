import { urlFor } from '../../lib/Client';
import { useStateContext } from '../../context/StateContext';

const MainProduct = ({ product }) => {
  const { onAdd } = useStateContext();

  const {
    name, price, ogPrice, slug, stars, sale, isNew, imgSrc,
    category,
  } = product;

  return (
    <div className="showcase">
      <div className="showcase-banner">
        {
        imgSrc?.length > 1
          ? (
            <>
              <img src={urlFor(imgSrc[0]).url()} alt={slug.current} width="300" className="product-img default" />
              <img src={urlFor(imgSrc[1]).url()} alt={slug.current} width="300" className="product-img hover" />
            </>
          )
          : (
            <>
              <img src={urlFor(imgSrc[0]).url()} alt={slug.current} width="300" className="product-img default" />
              <img src={urlFor(imgSrc[0]).url()} alt={slug.current} width="300" className="product-img hover" />
            </>
          )
        }

        { sale ? <p className="showcase-badge angle black">sale</p> : <p className="showcase-badge" /> }
        { isNew ? <p className="showcase-badge angle pink">new</p> : <p className="showcase-badge" /> }

        <div className="showcase-actions">

          {/* <button className="btn-action">
            <ion-icon name="heart-outline" />
          </button> */}

          <a className="btn-action" href={`/products/${slug.current}`}>
            <ion-icon name="eye-outline" />
          </a>

          {/* <button className="btn-action">
            <ion-icon name="repeat-outline" />
          </button> */}

          <button className="btn-action" onClick={() => onAdd(product, 1)}>
            <ion-icon name="bag-add-outline" />
          </button>
        </div>
      </div>

      <div className="showcase-content">
        <span className="span-clan">
          {
          category?.map((object, i) => (
            <a href={`/categories/${object.categorySlug.current}`} key={i} className="showcase-category">{object.categoryName}</a>
          ))
          }
        </span>
        <a href={`/products/${slug.current}`}>
          <h3 className="showcase-title">{name}</h3>
        </a>
        <div className="showcase-rating">

          { [...Array(stars)].map((e, i) => (<ion-icon key={i} name="star" />)) }
          { [...Array(5 - stars)].map((e, i) => (<ion-icon key={i} name="star-outline" />)) }

        </div>
        <div className="price-box">
          <p className="price">{`R${price}`}</p>

          { sale && ogPrice ? <del>{`R${ogPrice}`}</del> : <p /> }

        </div>
      </div>
    </div>
  );
};

export default MainProduct;

import { urlFor } from '../../lib/Client';

const SideBarProduct = ({
  product: {
    imgSrc, name, price, ogPrice, stars, slug, image, sale,
  },
}) => (
  <div className="showcase">
    <a href={`/products/${slug.current}`} className="showcase-img-box">
      {
         image?.length > 1
           ? <img src={urlFor(image[0]).url()} alt={slug.current} width="75" height="75" className="showcase-img" />
           : <div />
        }

      {
          imgSrc
            ? <img src={urlFor(imgSrc[0]).url()} alt={slug.current} width="70" className="showcase-img" />
            : <div />
        }
    </a>
    <div className="showcase-content">
      <a href={`/products/${slug.current}`}>
        <h4 className="showcase-title">{name}</h4>
      </a>
      <div className="showcase-rating">

        { [...Array(stars)].map((e, i) => (<ion-icon key={i} name="star" />)) }
        { [...Array(5 - stars)].map((e, i) => (<ion-icon key={i} name="star-outline" />)) }

      </div>
      <div className="price-box">

        { sale && ogPrice ? <del>{`R${ogPrice}`}</del> : <p /> }

        <p className="price">{`R${price}`}</p>
      </div>
    </div>
  </div>
);

export default SideBarProduct;
